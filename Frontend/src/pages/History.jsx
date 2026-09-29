import {
  History as HistoryIcon,
  Siren,
  MapPin,
  Clock
} from "lucide-react";

import { useContext } from "react";
import { EmergencyContext } from "../context/EmergencyContext";

export default function History() {
  const { history = [], activeEmergency } =
    useContext(EmergencyContext);

  // Combine stored history with the currently active emergency
  const allHistory = [
    ...(activeEmergency ? [activeEmergency] : []),
    ...history
  ];

  // Remove duplicate records
  const uniqueHistory = allHistory.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (existing) =>
          existing.createdAt === item.createdAt &&
          existing.type === item.type
      )
  );

  const formatDate = (date) => {
    if (!date) return "Unknown time";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    const now = new Date();

    const isToday =
      parsedDate.toDateString() ===
      now.toDateString();

    if (isToday) {
      return `Today, ${parsedDate.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      )}`;
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    if (
      parsedDate.toDateString() ===
      yesterday.toDateString()
    ) {
      return `Yesterday, ${parsedDate.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      )}`;
    }

    return parsedDate.toLocaleString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTitle = (item) => {
    if (!item?.type) {
      return "Emergency Assistance";
    }

    return item.type;
  };

  const getDescription = (item) => {
    if (item?.description) {
      return item.description;
    }

    return "Emergency assistance requested";
  };

  return (
    <>
      <div className="page-header">
        <h1>Emergency History</h1>

        <p>
          Your previous emergency assistance activity.
        </p>
      </div>

      <div className="card">

        {uniqueHistory.length > 0 ? (
          uniqueHistory.map((item, index) => (
            <div
              className="history-item"
              key={
                item.createdAt ||
                `${item.type}-${index}`
              }
            >
              <div
                className="history-status"
                style={{
                  display: "grid",
                  placeItems: "center"
                }}
              >
                <Siren size={15} />
              </div>

              <div className="history-content">
                <h4>
                  {getTitle(item)}
                </h4>

                <span>
                  {getDescription(item)}
                </span>

                {item.latitude &&
                  item.longitude && (
                    <div
                      style={{
                        marginTop: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 11,
                        color: "var(--muted)"
                      }}
                    >
                      <MapPin size={12} />

                      Location recorded
                    </div>
                  )}
              </div>

              <span
                className="stat-label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  whiteSpace: "nowrap"
                }}
              >
                <Clock size={12} />

                {formatDate(item.createdAt)}
              </span>
            </div>
          ))
        ) : (
          <div
            className="empty-state"
            style={{
              textAlign: "center",
              padding: "50px 20px"
            }}
          >
            <HistoryIcon size={40} />

            <h3>
              No emergency history yet
            </h3>

            <p>
              Your emergency activities will
              appear here after you use Ashraya.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

