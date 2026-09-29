import { useNavigate } from "react-router-dom";

export default function EmergencyButton() {
  const navigate = useNavigate();

  const handleEmergency = () => {
    navigate("/emergency");
  };

  return (
    <button
      className="emergency-button"
      onClick={handleEmergency}
    >
      🚨
      <span>Emergency Help</span>
    </button>
  );
}