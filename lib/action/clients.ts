import { headerOptions, getCSRFToken, getToken } from "../utils";
import { ConfirmPasswordType, UserFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function createClient(data: UserFormType) {
  const response = await fetch(`${api_url}/client/store`, { 
    method: "POST",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getClients() {
  const response = await fetch(`${api_url}/clients`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken()),
  })
  return response;//.json();
}

export async function getClientById(id: number) {
  const response = await fetch(`${api_url}/client/${id}`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken()),
  })
  return response;//.json();
}

export async function updateClient(data: UserFormType, id: number) {
  const response = await fetch(`${api_url}/client/${id}/update`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function suspendClient(data: ConfirmPasswordType, id: number, status: string) {
  const response = await fetch(`${api_url}/client/${id}/suspend`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
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
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}