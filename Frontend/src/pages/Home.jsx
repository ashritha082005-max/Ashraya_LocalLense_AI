import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Clock
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import EmergencyButton from "../components/EmergencyButton";
import EmergencyCard from "../components/EmergencyCard";
import LocationCard from "../components/LocationCard";
import HospitalCard from "../components/HospitalCard";
import HelpCard from "../components/HelpCard";

import { useLocation } from "../hooks/useLocation";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const emergencyTypes = [
    {
      title: "Medical Emergency",
      description: "Heart attack, injury or sudden illness",
      type: "Medical"
    },
    {
      title: "Fire",
      description: "Fire, smoke or building danger",
      type: "Fire"
    },
    {
      title: "Road Accident",
      description: "Vehicle accident or collision",
      type: "Accident"
    },
    {
      title: "Flood",
      description: "Flooding or water-related danger",
      type: "Flood"
    },
    {
      title: "Snake Bite",
      description: "Snake bite or animal emergency",
      type: "Snake"
    },
    {
      title: "Other Emergency",
      description: "Any other urgent situation",
      type: "Other"
    }
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            AI-POWERED EMERGENCY ASSISTANCE
          </div>

          <h1>
            Stay calm.
            <br />
            <span className="gradient-text">
              Ashraya is here.
            </span>
          </h1>

          <p>
            An intelligent emergency response copilot that
            helps you understand an emergency, find nearby
            assistance and take the next safe action.
          </p>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 22,
              flexWrap: "wrap"
            }}
          >
            <button
              className="primary-btn"
              onClick={() => navigate("/ai")}
            >
              Ask Ashraya AI
              <ArrowRight size={16} />
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/nearby")}
            >
              Find Nearby Help
            </button>
          </div>
        </div>

        <EmergencyButton />
      </section>

      <div className="dashboard-grid">
        <div className="grid-4">
          <div className="card">
            <div className="card-title">
              <div className="icon-box">
                <ShieldCheck size={20} />
              </div>

              Response Ready
            </div>

            <div className="stat-value">
              24/7
            </div>

            <div className="stat-label">
              Emergency assistance available
            </div>
          </div>
        </div>

        <div className="grid-4">
          <div className="card">
            <div className="card-title">
              <div className="icon-box">
                <Activity size={20} />
              </div>

              AI Assistance
            </div>

            <div className="stat-value">
              Live
            </div>

            <div className="stat-label">
              Intelligent emergency guidance
            </div>
          </div>
        </div>

        <div className="grid-4">
          <div className="card">
            <div className="card-title">
              <div className="icon-box">
                <Clock size={20} />
              </div>

              Fast Response
            </div>

            <div className="stat-value">
              SOS
            </div>

            <div className="stat-label">
              One-tap emergency activation
            </div>
          </div>
        </div>

        <div className="grid-6">
          <LocationCard location={location} />
        </div>

        <div className="grid-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <div className="icon-box">
                  <Activity size={20} />
                </div>

                Emergency Types
              </div>

              <span className="stat-label">
                Select situation
              </span>
            </div>

            <div className="emergency-cards">
              {emergencyTypes.map((item) => (
                <EmergencyCard
                  key={item.title}
                  {...item}
                  onClick={() =>
                    navigate(
                      `/emergency?type=${encodeURIComponent(
                        item.title
                      )}`
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid-8">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                Nearby Emergency Hospitals
              </div>

              <button
                className="secondary-btn"
                onClick={() =>
                  navigate("/hospitals")
                }
              >
                View All
              </button>
            </div>

            <div className="hospital-list">
              <HospitalCard
                hospital={{
                  name: "Nearby Emergency Hospital",
                  type: "24/7 Emergency Care",
                  distance: "Nearby",
                  phone: "108"
                }}
              />

              <HospitalCard
                hospital={{
                  name: "City Medical Centre",
                  type: "Multi-Speciality",
                  distance: "2.4 km"
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid-4">
          <HelpCard type="ambulance" />
        </div>

        <div className="grid-4">
          <HelpCard type="police" />
        </div>

        <div className="grid-4">
          <HelpCard type="fire" />
        </div>
      </div>
    </>
  );
}