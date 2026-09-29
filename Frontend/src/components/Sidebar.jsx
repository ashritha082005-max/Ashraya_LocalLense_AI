import {
  Home,
  Siren,
  MessageCircle,
  MapPin,
  Hospital,
  History,
  User,
  ShieldAlert
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const mainLinks = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home
    },
    {
      name: "Emergency",
      path: "/emergency",
      icon: Siren
    },
    {
      name: "AI Assistant",
      path: "/ai",
      icon: MessageCircle
    }
  ];

  const helpLinks = [
    {
      name: "Nearby Help",
      path: "/nearby",
      icon: MapPin
    },
    {
      name: "Hospitals",
      path: "/hospitals",
      icon: Hospital
    },
    {
      name: "Emergency History",
      path: "/history",
      icon: History
    }
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">
          <ShieldAlert size={24} />
        </div>

        <div className="brand-text">
          <h2>Ashraya</h2>
          <span>AI EMERGENCY COPILOT</span>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-title">
          Command
        </div>

        {mainLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>

      <div className="nav-section">
        <div className="nav-title">
          Assistance
        </div>

        {helpLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>

      <div className="nav-section">
        <div className="nav-title">
          Account
        </div>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <User size={18} />
          Profile
        </NavLink>
      </div>
    </aside>
  );
}