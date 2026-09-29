import {
  Ambulance,
  Shield,
  Flame,
  Phone
} from "lucide-react";

const data = {
  ambulance: {
    title: "Ambulance",
    number: "108",
    icon: Ambulance
  },

  police: {
    title: "Police",
    number: "112",
    icon: Shield
  },

  fire: {
    title: "Fire & Rescue",
    number: "101",
    icon: Flame
  }
};

export default function HelpCard({ type }) {
  const item = data[type];
  const Icon = item.icon;

  const callService = () => {
    window.location.href = `tel:${item.number}`;
  };

  return (
    <div className="card">

      <div className="card-title">
        <div className="icon-box">
          <Icon size={20} />
        </div>

        {item.title}
      </div>

      <div className="stat-value">
        {item.number}
      </div>

      <div className="stat-label">
        Emergency service
      </div>

      <button
        onClick={callService}
        className="emergency-button"
        style={{
          marginTop: 15,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          cursor: "pointer"
        }}
      >
        <Phone size={17} />
        Call {item.number}
      </button>

    </div>
  );
}

