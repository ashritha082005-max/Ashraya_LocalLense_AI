import { useContext, useState } from "react";

import { EmergencyContext } from "../context/EmergencyContext";

import { createEmergency } from "../services/emergencyService";

import { getCurrentLocation } from "../services/locationService";

export function useEmergency() {
  const {
    activeEmergency,
    addEmergency
  } = useContext(EmergencyContext);

  const [loading, setLoading] = useState(false);

  const [emergencyLocation, setEmergencyLocation] =
    useState(null);

  const [error, setError] = useState("");

  const triggerEmergency = async (emergencyType) => {
    setLoading(true);
    setError("");

    try {
      let location = {};

      // 📍 Get current location
      try {
        location = await getCurrentLocation();

        setEmergencyLocation(location);
      } catch (locationError) {
        console.log(
          "Location unavailable:",
          locationError
        );

        setEmergencyLocation(null);
      }

      // 🚨 Emergency data
      const emergency = {
        type: emergencyType,

        ...location,

        createdAt: new Date().toISOString()
      };

      // 💾 Save emergency in backend
      const response = await createEmergency(emergency);

      // Add to emergency context
      addEmergency(
        response?.data || emergency
      );

      return {
        success: true,
        data: response?.data || emergency
      };

    } catch (error) {
      console.error(
        "Emergency activation error:",
        error
      );

      setError(
        "Unable to activate emergency. Please call emergency services immediately."
      );

      return {
        success: false,
        error
      };

    } finally {
      setLoading(false);
    }
  };

  return {
    triggerEmergency,
    loading,
    activeEmergency,
    emergencyLocation,
    error
  };
}
