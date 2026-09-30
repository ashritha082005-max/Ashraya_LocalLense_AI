import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, ShieldCheck } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/auth/register",
        formData
      );

      if (response.data?.success) {
        login(
          response.data.data,
          response.data.token
        );

        navigate("/");
      } else {
        setError(
          response.data?.message ||
            "Registration failed."
        );
      }
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 430
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 25
          }}
        >
          <div
            className="icon-box"
            style={{
              margin: "0 auto 15px"
            }}
          >
            <ShieldCheck size={28} />
          </div>

          <h1>Create Ashraya Account</h1>

          <p
            style={{
              color: "var(--muted)",
              fontSize: 14
            }}
          >
            Create an account to manage your
            emergency assistance information.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>

            <input
              className="form-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              className="form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              className="form-input"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              className="form-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              minLength={6}
              required
            />
          </div>

          {error && (
            <div
              style={{
                color: "#d32f2f",
                fontSize: 13,
                marginBottom: 15
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center"
            }}
          >
            <UserPlus size={17} />

            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "var(--muted)"
          }}
        >
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}