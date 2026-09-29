import {
  Siren,
  Phone,
  MapPin,
  ShieldAlert,
  CheckCircle,
  MessageCircle
} from "lucide-react";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useEmergency } from "../hooks/useEmergency";
import { getEmergencyContacts } from "../services/contactService.js";

export default function Emergency() {
  const [params] = useSearchParams();

  const type =
    params.get("type") || "General Emergency";

  const {
    triggerEmergency,
    loading,
    emergencyLocation,
    error
  } = useEmergency();

  const [activated, setActivated] =
    useState(false);

  const [contacts, setContacts] =
    useState([]);

  const [contactsLoading, setContactsLoading] =
    useState(true);

  const [sosStatus, setSosStatus] =
    useState("");

  // Load saved emergency contacts
  useEffect(() => {
    const loadContacts = async () => {
      try {
        setContactsLoading(true);

        const response =
          await getEmergencyContacts();

        setContacts(
          response?.data || []
        );
      } catch (error) {
        console.error(
          "Unable to load emergency contacts:",
          error
        );

        setContacts([]);
      } finally {
        setContactsLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Convert phone number to WhatsApp format
  const normalizeWhatsAppPhone = (phone) => {
    let number = String(
      phone || ""
    ).replace(/\D/g, "");

    // Indian 10 digit number
    if (number.length === 10) {
      number = `91${number}`;
    }

    return number;
  };

  // Create WhatsApp SOS URL
  const createWhatsAppUrl = ({
    phone,
    latitude,
    longitude
  }) => {
    const whatsappPhone =
      normalizeWhatsAppPhone(phone);

    let locationText =
      "Location unavailable";

    if (
      latitude !== null &&
      latitude !== undefined &&
      longitude !== null &&
      longitude !== undefined
    ) {
      locationText =
        `https://www.google.com/maps?q=${latitude},${longitude}`;
    }

    const message =
      `🚨 ASHRAYA SOS ALERT\n\n` +
      `Emergency: ${type}\n\n` +
      `An emergency has been activated.\n\n` +
      `📍 My current location:\n` +
      `${locationText}\n\n` +
      `Please contact me immediately.`;

    return (
      `https://wa.me/${whatsappPhone}` +
      `?text=${encodeURIComponent(message)}`
    );
  };

  // 🚨 ACTIVATE EMERGENCY
  const handleEmergency = async () => {
    setSosStatus("");

    /*
      Open WhatsApp tabs immediately from the user's click.
      This helps reduce popup blocking.
    */
    const whatsappWindows = contacts.map(
      (contact) => {
        const popup = window.open(
          "about:blank",
          "_blank"
        );

        return {
          contact,
          popup
        };
      }
    );

    // Activate emergency
    const result =
      await triggerEmergency(type);

    // Emergency failed
    if (!result?.success) {
      whatsappWindows.forEach(
        ({ popup }) => {
          if (
            popup &&
            !popup.closed
          ) {
            popup.close();
          }
        }
      );

      return;
    }

    setActivated(true);

    /*
      First use location returned by backend.
      If unavailable, use location from useEmergency.
    */
    const emergencyData =
      result?.data || {};

    const latitude =
      emergencyData.latitude ??
      emergencyLocation?.latitude ??
      null;

    const longitude =
      emergencyData.longitude ??
      emergencyLocation?.longitude ??
      null;

    // No trusted contacts
    if (contacts.length === 0) {
      setSosStatus(
        "Emergency activated successfully. No trusted contacts are saved."
      );

      return;
    }

    let openedCount = 0;
    let blockedCount = 0;

    // Redirect each opened tab to WhatsApp
    whatsappWindows.forEach(
      ({ contact, popup }) => {
        if (
          !popup ||
          popup.closed
        ) {
          blockedCount++;
          return;
        }

        const whatsappUrl =
          createWhatsAppUrl({
            phone: contact.phone,
            latitude,
            longitude
          });

        popup.location.replace(
          whatsappUrl
        );

        openedCount++;
      }
    );

    if (blockedCount > 0) {
      setSosStatus(
        `Emergency activated. WhatsApp SOS prepared for ${openedCount} contact(s). ${blockedCount} popup(s) were blocked.`
      );
    } else {
      setSosStatus(
        `Emergency activated. WhatsApp SOS prepared for ${openedCount} contact(s). Please press Send in each WhatsApp chat.`
      );
    }
  };

  // 📍 SHARE LOCATION
  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Location services are not supported by this browser."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        const mapsLink =
          `https://www.google.com/maps?q=${latitude},${longitude}`;

        // Native share
        if (navigator.share) {
          try {
            await navigator.share({
              title:
                "Ashraya Emergency Location",
              text:
                "My current emergency location:",
              url: mapsLink
            });

            return;
          } catch (shareError) {
            console.log(
              "Sharing cancelled."
            );
          }
        }

        // Copy location link
        try {
          await navigator.clipboard.writeText(
            mapsLink
          );

          alert(
            "📍 Location link copied!\n\n" +
            "You can paste it into WhatsApp, SMS, or another messaging app."
          );
        } catch (clipboardError) {
          window.open(
            mapsLink,
            "_blank"
          );
        }
      },

      (locationError) => {
        console.error(
          "Location error:",
          locationError
        );

        if (
          locationError.code === 1
        ) {
          alert(
            "📍 Location permission was denied.\n\n" +
            "Please allow location access and try again."
          );
        } else if (
          locationError.code === 2
        ) {
          alert(
            "📍 Location could not be detected.\n\n" +
            "Please check your device location services."
          );
        } else {
          alert(
            "📍 Unable to get your location.\n\n" +
            "Please try again."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // 🗺️ OPEN EMERGENCY LOCATION
  const handleViewLocation = () => {
    const latitude =
      emergencyLocation?.latitude;

    const longitude =
      emergencyLocation?.longitude;

    if (
      latitude !== null &&
      latitude !== undefined &&
      longitude !== null &&
      longitude !== undefined
    ) {
      const url =
        `https://www.google.com/maps?q=${latitude},${longitude}`;

      window.open(
        url,
        "_blank"
      );
    } else {
      handleShareLocation();
    }
  };

  return (
    <div>

      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>
          Emergency Response
        </h1>

        <p>
          Tell Ashraya what is happening and receive
          immediate response guidance.
        </p>
      </div>

      <div className="dashboard-grid">

        {/* MAIN EMERGENCY CARD */}
        <div className="grid-8">
          <div
            className="card"
            style={{
              textAlign: "center",
              padding: "50px 25px"
            }}
          >

            {/* ICON */}
            <div
              style={{
                width: 90,
                height: 90,
                margin: "0 auto 20px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background:
                  "rgba(255,77,103,0.1)",
                color: "#ff5c73"
              }}
            >
              <Siren size={42} />
            </div>

            {/* EMERGENCY TYPE */}
            <h2
              style={{
                margin: "0 0 10px"
              }}
            >
              {type}
            </h2>

            <p
              style={{
                color: "var(--muted)",
                maxWidth: 500,
                margin:
                  "0 auto 25px",
                lineHeight: 1.7
              }}
            >
              If you are in immediate danger, contact
              emergency services. Ashraya can help you
              organize the next steps.
            </p>

            {/* TRUSTED CONTACT COUNT */}
            <div
              style={{
                marginBottom: 18,
                color: "var(--muted)",
                fontSize: 13
              }}
            >
              {contactsLoading
                ? "Checking trusted contacts..."
                : contacts.length > 0
                ? `${contacts.length} trusted contact(s) available for SOS`
                : "No trusted contacts saved"}
            </div>

            {/* ACTIVATE BUTTON */}
            <button
              className="danger-btn"
              style={{
                padding: "16px 30px",
                fontSize: 16
              }}
              onClick={handleEmergency}
              disabled={
                loading ||
                activated ||
                contactsLoading
              }
            >
              {activated ? (
                <>
                  <CheckCircle size={20} />
                  EMERGENCY ACTIVATED
                </>
              ) : (
                <>
                  <Siren size={20} />

                  {loading
                    ? "Activating..."
                    : "ACTIVATE EMERGENCY"}
                </>
              )}
            </button>

            {/* SUCCESS MESSAGE */}
            {activated && (
              <div
                style={{
                  marginTop: 25,
                  padding: 18,
                  borderRadius: 15,
                  background:
                    "rgba(39,217,154,0.08)",
                  border:
                    "1px solid rgba(39,217,154,0.15)",
                  color: "#27d99a"
                }}
              >
                <CheckCircle
                  size={20}
                  style={{
                    verticalAlign:
                      "middle",
                    marginRight: 8
                  }}
                />

                Emergency request recorded
                successfully.

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    color:
                      "var(--muted)"
                  }}
                >
                  Ashraya has recorded your
                  emergency.
                </div>
              </div>
            )}

            {/* WHATSAPP STATUS */}
            {sosStatus && (
              <div
                style={{
                  marginTop: 15,
                  padding: 15,
                  borderRadius: 12,
                  background:
                    "rgba(39,217,154,0.08)",
                  border:
                    "1px solid rgba(39,217,154,0.15)",
                  color: "#27d99a",
                  fontSize: 13,
                  lineHeight: 1.6,
                  textAlign: "left"
                }}
              >
                <MessageCircle
                  size={18}
                  style={{
                    verticalAlign:
                      "middle",
                    marginRight: 7
                  }}
                />

                {sosStatus}
              </div>
            )}

            {/* VIEW LOCATION */}
            {emergencyLocation?.latitude !==
                null &&
              emergencyLocation?.latitude !==
                undefined &&
              emergencyLocation?.longitude !==
                null &&
              emergencyLocation?.longitude !==
                undefined && (
                <button
                  className="secondary-btn full-btn"
                  onClick={
                    handleViewLocation
                  }
                  style={{
                    marginTop: 15
                  }}
                >
                  <MapPin size={17} />
                  View Emergency Location
                </button>
              )}

            {/* ERROR */}
            {error && (
              <div
                style={{
                  marginTop: 15,
                  padding: 12,
                  borderRadius: 10,
                  color: "#ff5c73",
                  background:
                    "rgba(255,77,103,0.08)"
                }}
              >
                {error}
              </div>
            )}

          </div>
        </div>

        {/* IMMEDIATE ACTIONS */}
        <div className="grid-4">
          <div className="card">

            <div className="card-title">
              <div className="icon-box">
                <ShieldAlert size={20} />
              </div>

              Immediate Actions
            </div>

            <div
              style={{
                marginTop: 20
              }}
            >

              {/* 112 */}
              <a
                href="tel:112"
                className="secondary-btn full-btn"
              >
                <Phone size={17} />
                Call 112
              </a>

              <br />

              {/* 108 */}
              <a
                href="tel:108"
                className="secondary-btn full-btn"
              >
                <Phone size={17} />
                Ambulance 108
              </a>

              <br />

              {/* SHARE LOCATION */}
              <button
                className="secondary-btn full-btn"
                onClick={
                  handleShareLocation
                }
                type="button"
              >
                <MapPin size={17} />
                Share Location
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}