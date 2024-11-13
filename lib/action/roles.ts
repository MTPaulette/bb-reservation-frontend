import { getToken } from "../utils";
import { ConfirmPasswordType, UserFormType } from "../definitions";
import { permission } from "process";

const api_url = 'http://127.0.0.1:8000/api';
const token = getToken();

export async function getRoles() {
  const response = await fetch(`${api_url}/roles`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return response.json();
}

export async function getAllPermissions() {
  const response = await fetch(`${api_url}/permissions`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return response.json();
}


export async function getRoleById(id: number) {
  const response = await fetch(`${api_url}/role/${id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return response.json();
}

export async function updateRole(data: number[], id: number) {
  const response = await fetch(`${api_url}/role/${id}/update`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      permissions: data
    }),
  })
  return response;
}