import { apiRequest } from "./api";

export async function createEmergency(data) {
  return apiRequest("/emergency", {
    method: "POST",
    body: data
  });
}

export async function getEmergencyHistory() {
  return apiRequest("/emergency/history");
}

