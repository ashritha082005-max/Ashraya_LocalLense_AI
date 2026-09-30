import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  ShieldCheck
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo">
          <ShieldCheck size={20} />
        </span>

        <span className="navbar-brand-text">
          <strong>Ashraya</strong>
          <small>AI</small>
        </span>
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/emergency">Emergency</Link>
        <Link to="/ai">AI Assistant</Link>
        <Link to="/hospitals">Hospitals</Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link
              to="/profile"
              className="user-pill"
              title="Profile"
            >
              <span className="user-avatar">
                <User size={15} />
              </span>

              <span className="user-name">
                {user.name}
              </span>
            </Link>

            <button
              className="logout-circle"
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={17} />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="login-button"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}