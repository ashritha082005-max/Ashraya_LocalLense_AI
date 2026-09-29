import { User, ShieldCheck } from "lucide-react";

export default function Profile() {
  return (
    <>
      <div className="page-header">
        <h1>Your Profile</h1>

        <p>
          Manage your emergency assistance information.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="grid-6">
          <div className="card">
            <div className="card-title">
              <div className="icon-box">
                <User size={20} />
              </div>

              Personal Information
            </div>

            <div style={{ marginTop: 25 }}>
              <div className="form-group">
                <label>Name</label>

                <input
                  className="form-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  className="form-input"
                  type="email"
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <input
                  className="form-input"
                  placeholder="Emergency contact number"
                />
              </div>

              <button className="primary-btn">
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid-6">
          <div className="card">
            <div className="card-title">
              <div className="icon-box">
                <ShieldCheck size={20} />
              </div>

              Safety Information
            </div>

            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.7,
                fontSize: 13
              }}
            >
              Your profile can later contain emergency
              contacts, medical information, allergies,
              preferred language and accessibility settings.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}