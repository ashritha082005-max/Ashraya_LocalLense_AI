import { useEffect, useState } from "react";
import {
  User,
  ShieldCheck,
  Save,
  CheckCircle
} from "lucide-react";
import api from "../services/api";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setProfileLoading(true);
      setError("");

      const response = await api.get(
        "/auth/profile"
      );

      if (
        response.data?.success &&
        response.data?.data
      ) {
        const user = response.data.data;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || ""
        });
      } else {
        setError(
          response.data?.message ||
            "Unable to load profile."
        );
      }
    } catch (err) {
      console.error(
        "Profile loading error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load your profile."
      );
    } finally {
      setProfileLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setMessage("");
    setError("");
  }

  async function handleSave(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.put(
        "/auth/profile",
        formData
      );

      if (response.data?.success) {
        const user = response.data.data;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || ""
        });

        setMessage(
          "Profile saved successfully."
        );
      } else {
        setError(
          response.data?.message ||
            "Unable to save profile."
        );
      }
    } catch (err) {
      console.error(
        "Profile save error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to save profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (profileLoading) {
    return (
      <div className="page-header">
        <h1>Your Profile</h1>

        <p>
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>Your Profile</h1>

        <p>
          Manage your emergency assistance information.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="grid-6">
          <div className="card">
            <div className="card-title">
              <div className="icon-box">
                <User size={20} />
              </div>

              Personal Information
            </div>

            <form
              onSubmit={handleSave}
              style={{ marginTop: 25 }}
            >
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
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <input
                  className="form-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Emergency contact number"
                />
              </div>

              <button
                type="submit"
                className="primary-btn"
                disabled={loading}
              >
                <Save size={17} />

                {loading
                  ? "Saving..."
                  : "Save Profile"}
              </button>

              {message && (
                <div
                  style={{
                    marginTop: 15,
                    color: "green",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13
                  }}
                >
                  <CheckCircle size={17} />

                  {message}
                </div>
              )}

              {error && (
                <div
                  style={{
                    marginTop: 15,
                    color: "#d32f2f",
                    fontSize: 13
                  }}
                >
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="grid-6">
          <div className="card">
            <div className="card-title">
              <div className="icon-box">
                <ShieldCheck size={20} />
              </div>

              Safety Information
            </div>

            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.7,
                fontSize: 13
              }}
            >
              Your profile can later contain
              emergency contacts, medical information,
              allergies, preferred language and
              accessibility settings.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}