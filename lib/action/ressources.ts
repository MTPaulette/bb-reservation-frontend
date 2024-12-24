import { headerOptions } from "../utils";
import { ConfirmPasswordType, RessourceFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function createRessource(data: RessourceFormType) {
  const response = await fetch(`${api_url}/ressource/store`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getRessources() {
  const response = await fetch(`${api_url}/ressources`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function getRessourceById(id: number) {
  const response = await fetch(`${api_url}/ressource/${id}`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function updateRessource(data: RessourceFormType, id: number) {
  const response = await fetch(`${api_url}/ressource/${id}/update`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify(data)
  })
  return response;
}

export async function deleteRessource(data: ConfirmPasswordType, id: number) {
  console.log(id);
  const response = await fetch(`${api_url}/ressource/${id}/delete`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}