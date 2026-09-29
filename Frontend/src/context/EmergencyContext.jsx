import {
  createContext,
  useEffect,
  useState
} from "react";

export const EmergencyContext =
  createContext();

export function EmergencyProvider({
  children
}) {
  const [activeEmergency, setActiveEmergency] =
    useState(null);

  const [history, setHistory] = useState(() => {
    try {
      const savedHistory =
        localStorage.getItem(
          "ashraya_emergency_history"
        );

      return savedHistory
        ? JSON.parse(savedHistory)
        : [];
    } catch (error) {
      console.error(
        "Unable to load emergency history:",
        error
      );

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "ashraya_emergency_history",
      JSON.stringify(history)
    );
  }, [history]);

  const addEmergency = (emergency) => {
    const emergencyWithId = {
      ...emergency,
      id:
        emergency.id ||
        `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}`,
      createdAt:
        emergency.createdAt ||
        new Date().toISOString()
    };

    setActiveEmergency(emergencyWithId);

    setHistory((previous) => [
      emergencyWithId,
      ...previous
    ]);
  };

  const clearHistory = () => {
    setHistory([]);
    setActiveEmergency(null);

    localStorage.removeItem(
      "ashraya_emergency_history"
    );
  };

  return (
    <EmergencyContext.Provider
      value={{
        activeEmergency,
        history,
        addEmergency,
        clearHistory
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
}
