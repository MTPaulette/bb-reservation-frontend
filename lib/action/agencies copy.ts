import { getToken } from "../utils";
import { ConfirmPasswordType, AgencyFormType, SuspensionFormType, HorairesType } from "../definitions";

const api_url = 'http://127.0.0.1:8000/api';
const token = getToken();

export async function createAgency(data: AgencyFormType) {
  const response = await fetch(`${api_url}/agency/store`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}

export async function getAgencies() {
  const response = await fetch(`${api_url}/agencies`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return response.json();
}

export async function getAgencyById(id: number) {
  const response = await fetch(`${api_url}/agency/${id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  return response.json();
}

export async function updateAgency(data: AgencyFormType, id: number, horaires: HorairesType) {
  const response = await fetch(`${api_url}/agency/${id}/update`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      "name": data.name,
      "email": data.email,
      "phonenumber": data.phonenumber,
      "address": data.address,
      "horaires": horaires,
    }),
  })
  return response;
}

export async function suspendAgency(data: SuspensionFormType, id: number, status: string) {
  console.log(data);
  const response = await fetch(`${api_url}/agency/${id}/suspend`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      "password": data.password,
      "cancel_suspension": status == 'active'? false : true,
      "reason_for_suspension_en": data.reason_for_suspension_en,
      "reason_for_suspension_fr": data.reason_for_suspension_fr
    }),
  })
  return response;
}


export async function deleteAgency(data: ConfirmPasswordType, id: number) {
  console.log(id);
  const response = await fetch(`${api_url}/agency/${id}/delete`, { 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response;
}