import { getToken } from "../utils";

const api_url = process.env.API_URL;

export async function getRoles() {
  const response = await fetch(`${api_url}/roles`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await getToken()}`,
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
      "Authorization": `Bearer ${await getToken()}`,
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
      "Authorization": `Bearer ${await getToken()}`,
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
      "Authorization": `Bearer ${await getToken()}`,
    },
    body: JSON.stringify({
      permissions: data
    }),
  })
  return response;
}