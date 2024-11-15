import { ConfirmPasswordType } from "../definitions";
import { getToken } from "../utils";

const api_url = process.env.API_URL;

export async function getLogs() {
  const response = await fetch(`${api_url}/logs`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getToken()}`,
    }
  })
  return response;//.json();
}

export async function clearLog(data: ConfirmPasswordType) {
  const response = await fetch(`${api_url}/clear_logs`, { 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getToken()}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}