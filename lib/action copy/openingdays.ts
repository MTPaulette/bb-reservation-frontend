import { getToken } from "../utils";

const api_url = process.env.API_URL;

export async function getOpeningdays() {
  const response = await fetch(`${api_url}/openingdays`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getToken()}`,
    }
  })
  return response.json();
}
