import { MapPin, Navigation } from "lucide-react";

export default function LocationCard({ location }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <div className="icon-box">
            <MapPin size={19} />
          </div>

          Your Location
        </div>

        <Navigation size={17} color="#42a5ff" />
      </div>

      <div className="location-info">
        <div className="location-pin">
          <MapPin size={22} />
        </div>

        <div>
          <h3>
            {location?.city || "Location not detected"}
          </h3>

          <p>
            {location?.latitude
              ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
              : "Enable location access to find nearby emergency services."}
          </p>
        </div>
      </div>
    </div>
  );
}