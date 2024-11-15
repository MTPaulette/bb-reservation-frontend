import { getToken } from "../utils";
import { ConfirmPasswordType, UserFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function createStaff(data: UserFormType) {
  const response = await fetch(`${api_url}/staff/store`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getToken()}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}

export async function getStaff() {
  const response = await fetch(`${api_url}/staff`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getToken()}`,
    }
  })
  return response;//.json();
}

export async function getStaffById(id: number) {
  const response = await fetch(`${api_url}/staff/${id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getToken()}`,
    }
  })
  return response;
}

export async function updateStaff(data: UserFormType, id: number) {
  const response = await fetch(`${api_url}/staff/${id}/update`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getToken()}`,
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
      "Authorization": `Bearer ${await getToken()}`,
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
      "Authorization": `Bearer ${await getToken()}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}