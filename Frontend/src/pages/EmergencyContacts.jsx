import { useEffect, useState } from "react";

import {
  UserPlus,
  Phone,
  Trash2,
  Users,
  ShieldCheck,
  MessageCircle,
  MapPin
} from "lucide-react";

import {
  addEmergencyContact,
  getEmergencyContacts,
  deleteEmergencyContact
} from "../services/contactService.js";

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");

  const [emergencyType, setEmergencyType] =
    useState("General Emergency");

  const [loading, setLoading] = useState(false);
  const [loadingContacts, setLoadingContacts] =
    useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadContacts = async () => {
    try {
      setLoadingContacts(true);
      setError("");

      const response =
        await getEmergencyContacts();

      setContacts(response?.data || []);
    } catch (err) {
      console.error(
        "Unable to load contacts:",
        err
      );

      setError(
        "Unable to load emergency contacts."
      );
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleAddContact = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !name.trim() ||
      !phone.trim()
    ) {
      setError(
        "Please enter a name and phone number."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await addEmergencyContact({
          name: name.trim(),
          phone: phone.trim(),
          relation:
            relation.trim() ||
            "Trusted Contact"
        });

      if (response?.data) {
        setContacts((previous) => [
          response.data,
          ...previous
        ]);
      } else {
        await loadContacts();
      }

      setName("");
      setPhone("");
      setRelation("");

      setMessage(
        "Emergency contact added successfully."
      );
    } catch (err) {
      console.error(
        "Unable to add contact:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to add emergency contact."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this emergency contact?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await deleteEmergencyContact(id);

      setContacts((previous) =>
        previous.filter(
          (contact) =>
            contact._id !== id
        )
      );

      setMessage(
        "Emergency contact deleted."
      );
    } catch (err) {
      console.error(
        "Unable to delete contact:",
        err
      );

      setError(
        "Unable to delete emergency contact."
      );
    }
  };

  const sendWhatsAppSOS = (contact) => {
    if (!contact?.phone) {
      alert(
        "This contact does not have a valid phone number."
      );

      return;
    }

    // Open the window immediately because browsers
    // may block popups created after geolocation.
    const whatsappWindow = window.open(
      "about:blank",
      "_blank"
    );

    if (!whatsappWindow) {
      alert(
        "Please allow pop-ups for Ashraya."
      );

      return;
    }

    if (!navigator.geolocation) {
      whatsappWindow.close();

      alert(
        "Location is not supported by this browser."
      );

      return;
    }

    whatsappWindow.document.write(`
      <html>
        <head>
          <title>Ashraya SOS</title>
        </head>
        <body
          style="
            font-family: Arial, sans-serif;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
          "
        >
          <h3>Getting your current location...</h3>
        </body>
      </html>
    `);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        const locationUrl =
          `https://www.google.com/maps?q=${latitude},${longitude}`;

        let phone =
          String(contact.phone)
            .replace(/\D/g, "");

        // Automatically handle Indian 10-digit numbers.
        if (phone.length === 10) {
          phone = `91${phone}`;
        }

        const message =
          `🚨 ASHRAYA SOS ALERT\n\n` +
          `Emergency: ${emergencyType}\n\n` +
          `I need emergency assistance.\n\n` +
          `📍 My current location:\n` +
          `${locationUrl}\n\n` +
          `Please contact me immediately.`;

        const whatsappUrl =
          `https://wa.me/${phone}` +
          `?text=${encodeURIComponent(message)}`;

        whatsappWindow.location.href =
          whatsappUrl;
      },

      (locationError) => {
        console.error(
          "Location error:",
          locationError
        );

        whatsappWindow.close();

        if (
          locationError.code ===
          locationError.PERMISSION_DENIED
        ) {
          alert(
            "Location permission was denied. Please allow location access and try again."
          );
        } else if (
          locationError.code ===
          locationError.POSITION_UNAVAILABLE
        ) {
          alert(
            "Your current location is unavailable."
          );
        } else if (
          locationError.code ===
          locationError.TIMEOUT
        ) {
          alert(
            "Location request timed out. Please try again."
          );
        } else {
          alert(
            "Unable to get your current location."
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

  return (
    <>
      <div className="page-header">
        <h1>Emergency Contacts</h1>

        <p>
          Add trusted people who can receive
          your SOS alerts.
        </p>
      </div>

      <div className="dashboard-grid">

        {/* ADD CONTACT */}
        <div className="grid-5">
          <div className="card">

            <div className="card-header">
              <div className="card-title">
                <div className="icon-box">
                  <UserPlus size={20} />
                </div>

                Add Emergency Contact
              </div>
            </div>

            {/* EMERGENCY TYPE */}
            <div
              style={{
                marginTop: 20
              }}
            >
              <label className="stat-label">
                Emergency Type
              </label>

              <select
                value={emergencyType}
                onChange={(event) =>
                  setEmergencyType(
                    event.target.value
                  )
                }
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: "12px 14px",
                  borderRadius: 10,
                  border:
                    "1px solid var(--border)",
                  background:
                    "var(--panel)",
                  color:
                    "var(--text)",
                  outline: "none"
                }}
              >
                <option>
                  General Emergency
                </option>

                <option>
                  Fire
                </option>

                <option>
                  Accident
                </option>

                <option>
                  Medical Emergency
                </option>

                <option>
                  Snake Bite
                </option>

                <option>
                  Flood
                </option>

                <option>
                  Severe Bleeding
                </option>
              </select>
            </div>

            <form
              onSubmit={handleAddContact}
              style={{
                marginTop: 20
              }}
            >

              {/* NAME */}
              <label className="stat-label">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(
                    event.target.value
                  )
                }
                placeholder="Example: Mom"
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: "12px 14px",
                  borderRadius: 10,
                  border:
                    "1px solid var(--border)",
                  background:
                    "var(--panel)",
                  color:
                    "var(--text)",
                  outline: "none"
                }}
              />

              {/* PHONE */}
              <label
                className="stat-label"
                style={{
                  display: "block",
                  marginTop: 18
                }}
              >
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value
                  )
                }
                placeholder="+91XXXXXXXXXX"
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: "12px 14px",
                  borderRadius: 10,
                  border:
                    "1px solid var(--border)",
                  background:
                    "var(--panel)",
                  color:
                    "var(--text)",
                  outline: "none"
                }}
              />

              {/* RELATION */}
              <label
                className="stat-label"
                style={{
                  display: "block",
                  marginTop: 18
                }}
              >
                Relationship
              </label>

              <input
                type="text"
                value={relation}
                onChange={(event) =>
                  setRelation(
                    event.target.value
                  )
                }
                placeholder="Example: Parent"
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: "12px 14px",
                  borderRadius: 10,
                  border:
                    "1px solid var(--border)",
                  background:
                    "var(--panel)",
                  color:
                    "var(--text)",
                  outline: "none"
                }}
              />

              {message && (
                <div
                  style={{
                    marginTop: 15,
                    padding: 12,
                    borderRadius: 10,
                    background:
                      "rgba(39,217,154,0.08)",
                    border:
                      "1px solid rgba(39,217,154,0.15)",
                    color: "#27d99a",
                    fontSize: 13
                  }}
                >
                  {message}
                </div>
              )}

              {error && (
                <div
                  style={{
                    marginTop: 15,
                    padding: 12,
                    borderRadius: 10,
                    background:
                      "rgba(255,77,103,0.08)",
                    border:
                      "1px solid rgba(255,77,103,0.15)",
                    color: "#ff5c73",
                    fontSize: 13
                  }}
                >
                  {error}
                </div>
              )}

              {/* ADD BUTTON */}
              <button
                type="submit"
                className="emergency-button"
                disabled={loading}
                style={{
                  width: "100%",
                  marginTop: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  gap: 8,
                  opacity:
                    loading ? 0.6 : 1
                }}
              >
                <UserPlus size={17} />

                {loading
                  ? "Adding..."
                  : "Add Emergency Contact"}
              </button>

            </form>

          </div>
        </div>

        {/* CONTACT LIST */}
        <div className="grid-7">
          <div className="card">

            <div className="card-header">
              <div className="card-title">
                <div className="icon-box">
                  <Users size={20} />
                </div>

                Saved Contacts
              </div>
            </div>

            {loadingContacts ? (
              <div
                style={{
                  padding: 40,
                  textAlign:
                    "center",
                  color:
                    "var(--muted)"
                }}
              >
                Loading contacts...
              </div>
            ) : contacts.length === 0 ? (
              <div
                style={{
                  padding: 40,
                  textAlign:
                    "center",
                  color:
                    "var(--muted)"
                }}
              >
                <Users
                  size={40}
                  style={{
                    marginBottom: 10
                  }}
                />

                <h3>
                  No emergency contacts
                </h3>

                <p>
                  Add a trusted person who
                  should receive your SOS
                  alerts.
                </p>
              </div>
            ) : (
              <div
                style={{
                  marginTop: 20
                }}
              >

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
                        gap: 15,
                        padding:
                          "16px 0",
                        borderBottom:
                          "1px solid var(--border)",
                        flexWrap:
                          "wrap"
                      }}
                    >

                      {/* CONTACT INFO */}
                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 14
                        }}
                      >

                        <div className="icon-box">
                          <ShieldCheck
                            size={19}
                          />
                        </div>

                        <div>

                          <h4
                            style={{
                              margin: 0
                            }}
                          >
                            {contact.name}
                          </h4>

                          <div
                            style={{
                              marginTop: 5,
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: 6,
                              color:
                                "var(--muted)",
                              fontSize: 12
                            }}
                          >
                            <Phone
                              size={12}
                            />

                            {contact.phone}
                          </div>

                          <div
                            style={{
                              marginTop: 4,
                              color:
                                "var(--muted)",
                              fontSize: 11
                            }}
                          >
                            {contact.relation}
                          </div>

                        </div>

                      </div>

                      {/* ACTIONS */}
                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 8,
                          flexWrap:
                            "wrap"
                        }}
                      >

                        {/* WHATSAPP SOS */}
                        <button
                          className="emergency-button"
                          onClick={() =>
                            sendWhatsAppSOS(
                              contact
                            )
                          }
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 6
                          }}
                        >
                          <MessageCircle
                            size={15}
                          />

                          WhatsApp SOS
                        </button>

                        {/* MAP */}
                        <button
                          className="secondary-btn"
                          onClick={() => {
                            if (
                              !navigator.geolocation
                            ) {
                              alert(
                                "Location is not supported by this browser."
                              );

                              return;
                            }

                            navigator.geolocation.getCurrentPosition(
                              (position) => {
                                const url =
                                  `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;

                                window.open(
                                  url,
                                  "_blank"
                                );
                              },
                              () => {
                                alert(
                                  "Unable to get your current location."
                                );
                              }
                            );
                          }}
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 6
                          }}
                        >
                          <MapPin
                            size={15}
                          />

                          Location
                        </button>

                        {/* DELETE */}
                        <button
                          className="secondary-btn"
                          onClick={() =>
                            handleDeleteContact(
                              contact._id
                            )
                          }
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 6
                          }}
                        >
                          <Trash2
                            size={15}
                          />

                          Delete
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>
        </div>

      </div>
    </>
  );
}