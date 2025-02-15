import { headerOptions } from "../../utils";
import { ConfirmPasswordType, AgencyFormType, SuspensionFormType, HorairesType } from "../../definitions";

const api_url = process.env.API_URL;

export async function createAgency(data: AgencyFormType) {
  const response = await fetch(`${api_url}/admin/agency/store`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getAgencies() {
  const response = await fetch(`${api_url}/admin/agencies`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;//.json();
}

export async function getAgencyById(id: number) {
  const response = await fetch(`${api_url}/admin/agency/${id}`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function updateAgency(data: AgencyFormType, id: number, horaires: HorairesType) {
  const response = await fetch(`${api_url}/admin/agency/${id}/update`, {
    method: "PUT",
    headers: await headerOptions(),
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
  const response = await fetch(`${api_url}/admin/agency/${id}/suspend`, {
    method: "PUT",
    headers: await headerOptions(),
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
  const response = await fetch(`${api_url}/admin/agency/${id}/delete`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}