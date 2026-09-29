import { useEffect, useState } from "react";
import {
  Hospital,
  MapPin,
  Navigation,
  RefreshCw,
  ExternalLink
} from "lucide-react";

export default function Hospitals() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Your browser does not support location services."
      );
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude
        });

        setLoading(false);
      },
      (locationError) => {
        console.error(
          "Location error:",
          locationError
        );

        setLoading(false);

        if (locationError.code === 1) {
          setError(
            "Location permission was denied. Please allow location access in your browser."
          );
        } else if (locationError.code === 2) {
          setError(
            "Your current location could not be detected."
          );
        } else if (locationError.code === 3) {
          setError(
            "Location request timed out. Please try again."
          );
        } else {
          setError(
            "Unable to get your current location."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const openNearbyHospitals = () => {
    if (!location) return;

    const { latitude, longitude } = location;

    const mapsUrl =
      `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`;

    window.open(mapsUrl, "_blank");
  };

  const openEmergencyHospitals = () => {
    if (!location) return;

    const { latitude, longitude } = location;

    const mapsUrl =
      `https://www.google.com/maps/search/emergency+hospitals/@${latitude},${longitude},14z`;

    window.open(mapsUrl, "_blank");
  };

  const openDirections = () => {
    if (!location) return;

    const { latitude, longitude } = location;

    const mapsUrl =
      `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=hospital`;

    window.open(mapsUrl, "_blank");
  };

  return (
    <>
      <div className="page-header">
        <h1>Emergency Hospitals</h1>

        <p>
          Find real hospitals and emergency care
          facilities near your current location.
        </p>
      </div>

      <div className="dashboard-grid">

        {/* LEFT SIDE */}
        <div className="grid-8">
          <div className="card">

            <div className="card-header">
              <div className="card-title">
                <div className="icon-box">
                  <Hospital size={20} />
                </div>

                Nearby Hospitals
              </div>
            </div>

            <div
              style={{
                marginTop: 20,
                padding: 25,
                borderRadius: 15,
                border: "1px solid var(--border)",
                background: "rgba(66,165,255,0.05)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15
                }}
              >
                <div
                  className="icon-box"
                  style={{
                    width: 50,
                    height: 50
                  }}
                >
                  <Hospital size={25} />
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0
                    }}
                  >
                    Find Real Hospitals
                  </h3>

                  <p
                    style={{
                      margin: "6px 0 0",
                      color: "var(--muted)",
                      fontSize: 13
                    }}
                  >
                    Ashraya uses your current browser
                    location to search Google Maps for
                    nearby hospitals.
                  </p>
                </div>
              </div>

              <button
                className="emergency-button"
                onClick={openNearbyHospitals}
                disabled={!location || loading}
                style={{
                  marginTop: 20,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  cursor:
                    !location || loading
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    !location || loading ? 0.6 : 1
                }}
              >
                <ExternalLink size={17} />

                {loading
                  ? "Getting Your Location..."
                  : "Find Nearby Hospitals"}
              </button>

              <button
                className="secondary-btn full-btn"
                onClick={openEmergencyHospitals}
                disabled={!location || loading}
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  cursor:
                    !location || loading
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    !location || loading ? 0.6 : 1
                }}
              >
                <Hospital size={17} />

                Find Emergency Hospitals
              </button>
            </div>

            {location && (
              <div
                style={{
                  marginTop: 20,
                  padding: 18,
                  borderRadius: 15,
                  background:
                    "rgba(39,217,154,0.08)",
                  border:
                    "1px solid rgba(39,217,154,0.15)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#27d99a"
                  }}
                >
                  <MapPin size={19} />

                  <strong>
                    Your location detected
                  </strong>
                </div>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "var(--muted)"
                  }}
                >
                  Latitude: {location.latitude.toFixed(6)}
                  <br />
                  Longitude: {location.longitude.toFixed(6)}
                </div>
              </div>
            )}

            {error && (
              <div
                style={{
                  marginTop: 20,
                  padding: 18,
                  borderRadius: 15,
                  color: "#ff5c73",
                  background:
                    "rgba(255,77,103,0.08)",
                  border:
                    "1px solid rgba(255,77,103,0.15)"
                }}
              >
                <strong>
                  Location unavailable
                </strong>

                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 13
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            <button
              className="secondary-btn full-btn"
              onClick={getLocation}
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              <RefreshCw size={16} />

              Refresh My Location
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid-4">
          <div className="card">

            <div className="card-title">
              <div className="icon-box">
                <MapPin size={20} />
              </div>

              Location
            </div>

            <div
              style={{
                height: 220,
                marginTop: 20,
                borderRadius: 15,
                display: "grid",
                placeItems: "center",
                background:
                  "linear-gradient(135deg,#121b2e,#0a101c)",
                border:
                  "1px solid var(--border)"
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: 20
                }}
              >
                <MapPin
                  size={40}
                  color="#42a5ff"
                />

                {loading ? (
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: 13
                    }}
                  >
                    Detecting your location...
                  </p>
                ) : location ? (
                  <>
                    <p
                      style={{
                        color: "#27d99a",
                        fontWeight: 600
                      }}
                    >
                      Location detected
                    </p>

                    <p
                      style={{
                        color: "var(--muted)",
                        fontSize: 11
                      }}
                    >
                      GPS location ready
                    </p>
                  </>
                ) : (
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: 13
                    }}
                  >
                    Location unavailable
                  </p>
                )}
              </div>
            </div>

            {/* Directions */}
            <button
              className="emergency-button"
              onClick={openDirections}
              disabled={!location || loading}
              style={{
                marginTop: 15,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor:
                  !location || loading
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  !location || loading ? 0.6 : 1
              }}
            >
              <Navigation size={17} />

              Get Directions to Hospital
            </button>

            {/* Google Maps */}
            <button
              className="secondary-btn full-btn"
              onClick={openNearbyHospitals}
              disabled={!location || loading}
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor:
                  !location || loading
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  !location || loading ? 0.6 : 1
              }}
            >
              <MapPin size={17} />

              Open Google Maps
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

