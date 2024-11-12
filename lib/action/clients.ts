import { getToken } from "../utils";
import { UserFormType } from "../definitions";

const api_url = 'http://127.0.0.1:8000/api';
const token = getToken();

export async function createStaff(data: UserFormType) {
  const response = await fetch(`${api_url}/staff/store`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}

export async function getClients() {
  // const response = await fetch(`http://127.0.0.1:8000/api/clients`, {
  const response = await fetch(`${api_url}/clients`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return response.json();
}
