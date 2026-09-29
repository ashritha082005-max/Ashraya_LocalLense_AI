import { apiRequest } from "./api";

export async function registerUser(data) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

export async function loginUser(data) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
}