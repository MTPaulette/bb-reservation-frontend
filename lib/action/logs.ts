import { ConfirmPasswordType } from "../definitions";
import { headerOptions, getCSRFToken, getToken } from "../utils";

const api_url = process.env.API_URL;

export async function getLogs() {
  const response = await fetch(`${api_url}/logs`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken()),
  })
  return response;//.json();
}

export async function clearLog(data: ConfirmPasswordType) {
  const response = await fetch(`${api_url}/clear_logs`, { 
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}