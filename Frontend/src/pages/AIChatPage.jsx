import { Bot, Sparkles } from "lucide-react";
import AIChat from "../components/AIChat";

export default function AIChatPage() {
  return (
    <>
      <div className="page-header">
        <h1>Ask Ashraya AI</h1>

        <p>
          Describe the emergency in your own words.
          Ashraya will provide structured guidance.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="grid-8">
          <AIChat />
        </div>

        <div className="grid-4">
          <div className="card">
            <div className="card-title">
              <div className="icon-box">
                <Sparkles size={19} />
              </div>

              What can I ask?
            </div>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10
              }}
            >
              {[
                "Someone is unconscious",
                "There is a fire nearby",
                "I have been bitten by a snake",
                "Someone is bleeding",
                "There has been a road accident"
              ].map((text) => (
                <div
                  key={text}
                  className="emergency-card"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div
            className="card"
            style={{ marginTop: 20 }}
          >
            <div className="card-title">
              <Bot size={19} />
              Safety Reminder
            </div>

            <p
              style={{
                color: "var(--muted)",
                fontSize: 12,
                lineHeight: 1.7
              }}
            >
              AI guidance is intended to assist with
              emergency information. In a life-threatening
              situation, contact emergency services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}