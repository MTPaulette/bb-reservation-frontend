import { getToken } from "../utils";
import { ConfirmPasswordType, UserFormType } from "../definitions";

const api_url = 'http://127.0.0.1:8000/api';
const token = getToken();

export async function updateProfile(data: UserFormType) {
  const response = await fetch(`${api_url}/profile`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}

export async function suspendClient(data: ConfirmPasswordType, id: number, status: string) {
  const response = await fetch(`${api_url}/client/${id}/suspend`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      "password": data.password,
      "cancel_suspension": status == 'active'? false : true
    }),
  })
  return response;
}


export async function deleteClient(data: ConfirmPasswordType, id: number) {
  const response = await fetch(`${api_url}/client/${id}/delete`, { 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}