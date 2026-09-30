import {
  Siren,
  Phone,
  MapPin,
  ShieldAlert,
  CheckCircle,
  MessageCircle,
  UserPlus,
  Trash2
} from "lucide-react";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useEmergency } from "../hooks/useEmergency";
import {
  getEmergencyContacts,
  addEmergencyContact,
  deleteEmergencyContact
} from "../services/contactService.js";

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

  // Contact form
  const [contactName, setContactName] =
    useState("");

  const [contactPhone, setContactPhone] =
    useState("");

  const [contactRelationship, setContactRelationship] =
    useState("");

  const [savingContact, setSavingContact] =
    useState(false);

  const [deletingContact, setDeletingContact] =
    useState(null);

  // Load trusted contacts
  const loadContacts = async () => {
    try {
      setContactsLoading(true);

      const response =
        await getEmergencyContacts();

      setContacts(response?.data || []);
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

  useEffect(() => {
    loadContacts();
  }, []);

  // Add trusted contact
  const handleAddContact = async () => {
    if (!contactName.trim()) {
      alert("Please enter contact name.");
      return;
    }

    if (!contactPhone.trim()) {
      alert("Please enter phone number.");
      return;
    }

    try {
      setSavingContact(true);

      const response =
        await addEmergencyContact({
          name: contactName.trim(),
          phone: contactPhone.trim(),
          relationship:
            contactRelationship.trim()
        });

      if (response?.success) {
        setContactName("");
        setContactPhone("");
        setContactRelationship("");

        await loadContacts();

        alert(
          "✅ Trusted contact added successfully."
        );
      } else {
        alert(
          response?.message ||
          "Unable to add contact."
        );
      }
    } catch (error) {
      console.error(
        "Add contact error:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Unable to save trusted contact."
      );
    } finally {
      setSavingContact(false);
    }
  };

  // Delete trusted contact
  const handleDeleteContact = async (
    contactId
  ) => {
    if (!contactId) return;

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this trusted contact?"
      );

    if (!confirmed) return;

    try {
      setDeletingContact(contactId);

      const response =
        await deleteEmergencyContact(
          contactId
        );

      if (response?.success) {
        setContacts((prev) =>
          prev.filter(
            (contact) =>
              contact._id !== contactId
          )
        );

        alert(
          "✅ Trusted contact deleted."
        );
      } else {
        alert(
          response?.message ||
          "Unable to delete contact."
        );
      }
    } catch (error) {
      console.error(
        "Delete contact error:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Unable to delete trusted contact."
      );
    } finally {
      setDeletingContact(null);
    }
  };

  // Convert phone number to WhatsApp format
  const normalizeWhatsAppPhone = (
    phone
  ) => {
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
    if (loading || activated) {
      return;
    }

    setSosStatus("");

    try {
      // First record the emergency
      const result =
        await triggerEmergency(type);

      // Emergency failed
      if (!result?.success) {
        return;
      }

      setActivated(true);

      // Get location
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

      // Create WhatsApp URLs
      const whatsappUrls =
        contacts.map((contact) =>
          createWhatsAppUrl({
            phone: contact.phone,
            latitude,
            longitude
          })
        );

      /*
        Open the first WhatsApp chat directly.
        This avoids creating about:blank popup windows.
      */
      if (whatsappUrls.length > 0) {
        window.location.href =
          whatsappUrls[0];
      }

      if (whatsappUrls.length === 1) {
        setSosStatus(
          "Emergency activated. WhatsApp SOS is ready. Please press Send in WhatsApp."
        );
      } else {
        setSosStatus(
          `Emergency activated. WhatsApp SOS prepared for ${whatsappUrls.length} contacts. Please send the message in WhatsApp.`
        );
      }
    } catch (error) {
      console.error(
        "Emergency activation error:",
        error
      );

      setSosStatus(
        "Emergency was recorded, but WhatsApp could not be opened."
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

            {/* TRUSTED CONTACTS */}
            <div
              style={{
                marginTop: 25,
                marginBottom: 25,
                padding: 20,
                borderRadius: 15,
                background:
                  "rgba(255,255,255,0.03)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                textAlign: "left"
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8
                }}
              >
                <UserPlus size={20} />

                <h3
                  style={{
                    margin: 0
                  }}
                >
                  Trusted Emergency Contacts
                </h3>
              </div>

              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 13,
                  lineHeight: 1.6
                }}
              >
                Add a family member or trusted person.
                Ashraya can prepare an SOS WhatsApp
                message for them when you activate an
                emergency.
              </p>

              {/* NAME */}
              <input
                type="text"
                placeholder="Contact name"
                value={contactName}
                onChange={(e) =>
                  setContactName(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: 12,
                  marginBottom: 10,
                  borderRadius: 8,
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  background:
                    "rgba(255,255,255,0.05)",
                  color: "inherit",
                  boxSizing: "border-box"
                }}
              />

              {/* PHONE */}
              <input
                type="tel"
                placeholder="Phone number"
                value={contactPhone}
                onChange={(e) =>
                  setContactPhone(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: 12,
                  marginBottom: 10,
                  borderRadius: 8,
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  background:
                    "rgba(255,255,255,0.05)",
                  color: "inherit",
                  boxSizing: "border-box"
                }}
              />

              {/* RELATIONSHIP */}
              <input
                type="text"
                placeholder="Relationship (e.g. Mother)"
                value={contactRelationship}
                onChange={(e) =>
                  setContactRelationship(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  padding: 12,
                  marginBottom: 12,
                  borderRadius: 8,
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  background:
                    "rgba(255,255,255,0.05)",
                  color: "inherit",
                  boxSizing: "border-box"
                }}
              />

              {/* ADD CONTACT */}
              <button
                type="button"
                className="secondary-btn full-btn"
                onClick={
                  handleAddContact
                }
                disabled={
                  savingContact
                }
              >
                <UserPlus size={17} />

                {savingContact
                  ? "Saving..."
                  : "Add Trusted Contact"}
              </button>

              {/* SAVED CONTACTS */}
              {contacts.length > 0 && (
                <div
                  style={{
                    marginTop: 25
                  }}
                >
                  <h4>
                    Saved Contacts
                  </h4>

                  {contacts.map(
                    (contact) => (
                      <div
                        key={
                          contact._id
                        }
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "space-between",
                          gap: 12,
                          padding: 14,
                          marginBottom: 10,
                          borderRadius: 10,
                          background:
                            "rgba(39,217,154,0.06)",
                          border:
                            "1px solid rgba(39,217,154,0.1)"
                        }}
                      >

                        <div>
                          <strong>
                            👤{" "}
                            {contact.name}
                          </strong>

                          <div
                            style={{
                              fontSize: 13,
                              color:
                                "var(--muted)",
                              marginTop: 4
                            }}
                          >
                            📱{" "}
                            {contact.phone}
                          </div>

                          {contact.relationship && (
                            <div
                              style={{
                                fontSize: 13,
                                color:
                                  "var(--muted)"
                              }}
                            >
                              ❤️{" "}
                              {
                                contact.relationship
                              }
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteContact(
                              contact._id
                            )
                          }
                          disabled={
                            deletingContact ===
                            contact._id
                          }
                          style={{
                            border: "none",
                            background:
                              "rgba(255,77,103,0.1)",
                            color:
                              "#ff5c73",
                            padding:
                              "8px 10px",
                            borderRadius: 8,
                            cursor:
                              "pointer"
                          }}
                          title="Delete contact"
                        >
                          <Trash2
                            size={17}
                          />
                        </button>

                      </div>
                    )
                  )}
                </div>
              )}

            </div>

            {/* ACTIVATE BUTTON */}
            <button
              className="danger-btn"
              style={{
                padding: "16px 30px",
                fontSize: 16
              }}
              onClick={
                handleEmergency
              }
              disabled={
                loading ||
                activated ||
                contactsLoading
              }
            >
              {activated ? (
                <>
                  <CheckCircle
                    size={20}
                  />
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
                <ShieldAlert
                  size={20}
                />
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
