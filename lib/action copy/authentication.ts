import { getCSRFToken, getToken } from "../utils";
import { AuthUserType } from "../definitions";

const api_url = process.env.API_URL;

//register
export async function createAccount(data: AuthUserType) {
  const response = await fetch(`${api_url}/register`, {
    method: "POST",
    headers: {
      //"Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
  return response;
}



export async function logoutUser() {
  const response = await fetch(`${api_url}/logout`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "X-XSRF-TOKEN": `${await getCSRFToken()}`,
      "Authorization": `Bearer ${await getToken()}`,
    },
    credentials: "same-origin",
  });

  return response;
}