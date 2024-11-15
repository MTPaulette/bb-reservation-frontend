import { headerOptions, getCSRFToken, getToken } from "../utils";
import { AuthUserType } from "../definitions";

const api_url = process.env.API_URL;

//register
export async function createAccount(data: AuthUserType) {
  const response = await fetch(`${api_url}/register`, {
    method: "POST",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}



export async function logoutUser() {
  const response = await fetch(`${api_url}/logout`, {
    method: "DELETE",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    credentials: "same-origin",
  });

  return response;
}