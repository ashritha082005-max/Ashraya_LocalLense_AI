import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🛡️ Ashraya AI
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/emergency">Emergency</Link>
        <Link to="/ai-chat">AI Assistant</Link>
        <Link to="/hospitals">Hospitals</Link>
      </div>
    </nav>
  );
}