import { headerOptions } from "../utils";
const api_url = process.env.API_URL;

export async function getRoles() {
  const response = await fetch(`${api_url}/roles`, {
    method: "GET",
    headers: await headerOptions(),
  })
  return response;
}

export async function getAllPermissions() {
  const response = await fetch(`${api_url}/permissions`, {
    method: "GET",
    headers: await headerOptions(),
  })
  return response.json();
}


export async function getRoleById(id: number) {
  const response = await fetch(`${api_url}/role/${id}`, {
    method: "GET",
    headers: await headerOptions(),
  })
  return response.json();
}

export async function updateRole(data: number[], id: number) {
  const response = await fetch(`${api_url}/role/${id}/update`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify({
      permissions: data
    }),
  })
  return response;
}