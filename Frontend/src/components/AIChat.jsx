import { useState } from "react";
import { apiRequest } from "../services/api";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I'm Ashraya AI. How can I help you?"
    }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage
      }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const data = await apiRequest("/ai/chat", {
        method: "POST",
        body: {
          message: userMessage
        }
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.message ||
            data.response ||
            data.answer ||
            "I received your emergency, but I could not generate a response."
        }
      ]);
    } catch (error) {
      console.error("AI error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "I'm unable to connect to the emergency AI service right now. Please call emergency services immediately if you are in danger."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chat">
      <div className="chat-messages">
        {messages.map((item, index) => (
          <div
            key={index}
            className={`chat-message ${item.role}`}
          >
            {item.text}
          </div>
        ))}

        {loading && (
          <div className="chat-message ai">
            Ashraya AI is thinking...
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Describe your emergency..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}