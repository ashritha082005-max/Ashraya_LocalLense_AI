import {
  Ambulance,
  Shield,
  Flame,
  Hospital,
  MapPin,
  Phone
} from "lucide-react";

import HelpCard from "../components/HelpCard";

export default function NearbyHelp() {
  const callEmergency = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <>
      <div className="page-header">
        <h1>Nearby Help</h1>

        <p>
          Quickly access emergency services around you.
        </p>
      </div>

      <div className="dashboard-grid">

        {/* Ambulance */}
        <div className="grid-4">
          <HelpCard type="ambulance" />
        </div>

        {/* Police */}
        <div className="grid-4">
          <HelpCard type="police" />
        </div>

        {/* Fire */}
        <div className="grid-4">
          <HelpCard type="fire" />
        </div>

        {/* Emergency Resources */}
        <div className="grid-12">
          <div className="card">

            <div className="card-header">
              <div className="card-title">
                <div className="icon-box">
                  <MapPin size={20} />
                </div>

                Nearby Emergency Resources
              </div>
            </div>

            <div className="emergency-cards">

              {/* Hospitals */}
              <div className="emergency-card">
                <Hospital size={24} />

                <h3>Hospitals</h3>

                <p>
                  Find emergency hospitals near your
                  current location.
                </p>

                <button
                  className="emergency-button"
                  onClick={() => {
                    window.open(
                      "https://www.google.com/maps/search/hospitals+near+me",
                      "_blank"
                    );
                  }}
                >
                  <MapPin size={16} />
                  Find Hospitals
                </button>
              </div>

              {/* Ambulance */}
              <div className="emergency-card">
                <Ambulance size={24} />

                <h3>Ambulance</h3>

                <p>
                  Quickly call ambulance services.
                </p>

                <button
                  className="emergency-button"
                  onClick={() => callEmergency("108")}
                >
                  <Phone size={16} />
                  Call 108
                </button>
              </div>

              {/* Police */}
              <div className="emergency-card">
                <Shield size={24} />

                <h3>Police</h3>

                <p>
                  Contact police emergency services.
                </p>

                <button
                  className="emergency-button"
                  onClick={() => callEmergency("112")}
                >
                  <Phone size={16} />
                  Call 112
                </button>
              </div>

              {/* Fire */}
              <div className="emergency-card">
                <Flame size={24} />

                <h3>Fire & Rescue</h3>

                <p>
                  Contact fire and rescue services.
                </p>

                <button
                  className="emergency-button"
                  onClick={() => callEmergency("101")}
                >
                  <Phone size={16} />
                  Call 101
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

