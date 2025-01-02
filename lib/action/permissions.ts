import { headerOptions } from "../utils";

const api_url = process.env.API_URL;

export async function getPermissions() {
  const response = await fetch(`${api_url}/auth-permissions`, {
    method: "GET",
    headers: await headerOptions(),
  })
  return response; //.json();
}