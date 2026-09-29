import { useEffect, useState } from "react";
import { getCurrentLocation } from "../services/locationService";

export function useLocation() {
  const [location, setLocation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    getCurrentLocation()
      .then((data) => {
        setLocation({
          ...data,
          city: "Current Location"
        });
      })
      .catch(() => {
        setLocation(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    location,
    loading,
    ...location
  };
}