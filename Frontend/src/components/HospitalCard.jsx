import { Hospital, Phone } from "lucide-react";

export default function HospitalCard({
  hospital
}) {
  return (
    <div className="hospital-item">
      <div className="hospital-icon">
        <Hospital size={19} />
      </div>

      <div className="hospital-details">
        <h4>{hospital.name}</h4>
        <span>
          {hospital.type || "Emergency Hospital"}
        </span>
      </div>

      <div>
        <div className="distance">
          {hospital.distance || "Nearby"}
        </div>

        {hospital.phone && (
          <a href={`tel:${hospital.phone}`}>
            <Phone
              size={15}
              color="#27d99a"
            />
          </a>
        )}
      </div>
    </div>
  );
}