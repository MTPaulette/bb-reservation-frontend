import { headerOptions } from "../utils";
import { AuthUserType } from "../definitions";

const api_url = process.env.API_URL;

//register
export async function createAccount(data: AuthUserType) {
  const response = await fetch(`${api_url}/register`, {
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}



export async function logoutUser() {
  const response = await fetch(`${api_url}/logout`, {
    method: "DELETE",
    headers: await headerOptions(),
    credentials: "same-origin",
  });

  return response;
}