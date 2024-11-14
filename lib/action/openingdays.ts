import { getToken } from "../utils";

const api_url = 'http://127.0.0.1:8000/api';
const token = getToken();

export async function getOpeningdays() {
  const response = await fetch(`${api_url}/openingdays`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return response.json();
}
