import {
  HeartPulse,
  Flame,
  Car,
  Droplets,
  Bug,
  TriangleAlert
} from "lucide-react";

const icons = {
  Medical: HeartPulse,
  Fire: Flame,
  Accident: Car,
  Flood: Droplets,
  Snake: Bug,
  Other: TriangleAlert
};

export default function EmergencyCard({
  title,
  description,
  type,
  onClick
}) {
  const Icon = icons[type] || TriangleAlert;

  return (
    <button
      className="emergency-card"
      onClick={onClick}
      style={{
        textAlign: "left",
        color: "inherit",
        width: "100%",
        cursor: "pointer"
      }}
    >
      <div className="emergency-card-icon">
        <Icon size={20} />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </button>
  );
}