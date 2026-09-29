import { apiRequest } from "./api";

export async function askAI(message) {
  return apiRequest("/ai/chat", {
    method: "POST",

    body: JSON.stringify({
      message
    })
  });
}