import { headerOptions, getCSRFToken, getToken } from "../utils";

const api_url = process.env.API_URL;

export async function getOpeningdays() {
  const response = await fetch(`${api_url}/openingdays`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken()),
  })
  return response.json();
}
