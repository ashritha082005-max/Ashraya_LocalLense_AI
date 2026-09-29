import { apiRequest } from "./api";

export async function addEmergencyContact(data) {
  return apiRequest("/contacts", {
    method: "POST",
    body: data
  });
}

export async function getEmergencyContacts() {
  return apiRequest("/contacts");
}

export async function deleteEmergencyContact(id) {
  return apiRequest(`/contacts/${id}`, {
    method: "DELETE"
  });
}