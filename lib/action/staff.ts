import { getToken } from "../utils";
import { ConfirmPasswordType, UserFormType } from "../definitions";

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

export async function getStaff() {
  const token = getToken();
  // const response = await fetch(`http://127.0.0.1:8000/api/clients`, {
  const response = await fetch(`${api_url}/staff`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return response.json();
}

export async function updateStaff(data: UserFormType, id: number) {
  const response = await fetch(`${api_url}/staff/${id}/update`, { 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}

export async function suspendStaff(data: ConfirmPasswordType, id: number, status: string) {
  const response = await fetch(`${api_url}/staff/${id}/suspend`, { 
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


export async function deleteStaff(data: ConfirmPasswordType, id: number) {
  const response = await fetch(`${api_url}/staff/${id}/delete`, { 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}