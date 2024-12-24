import { ConfirmPasswordType } from "../definitions";
import { headerOptions } from "../utils";

const api_url = process.env.API_URL;

export async function getLogs() {
  const response = await fetch(`${api_url}/logs`, {
    method: "GET",
    headers: await headerOptions(),
  })
  return response;//.json();
}

export async function clearLog(data: ConfirmPasswordType) {
  const response = await fetch(`${api_url}/clear_logs`, { 
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}