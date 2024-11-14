import { ConfirmPasswordType } from "../definitions";
import { getToken } from "../utils";

const api_url = 'http://127.0.0.1:8000/api';
const token = getToken();

export async function getLogs() {
  const response = await fetch(`${api_url}/logs`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return response;//.json();
}

export async function clearLog(data: ConfirmPasswordType) {
  const response = await fetch(`${api_url}/clear_logs`, { 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}