import { headerOptions, getCSRFToken, getToken } from "../utils";
import { ConfirmPasswordType, CharacteristicFormType, SuspensionFormType, HorairesType } from "../definitions";

const api_url = process.env.API_URL;

export async function newCharacteristic(data: CharacteristicFormType) {
  const response = await fetch(`${api_url}/characteristic/store`, { 
    method: "POST",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getCharacteristics() {
  const response = await fetch(`${api_url}/characteristics`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken())
  })
  return response;//.json();
}

export async function getCharacteristicById(id: number) {
  const response = await fetch(`${api_url}/characteristic/${id}`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken())
  })
  return response;
}

export async function updateCharacteristic(data: CharacteristicFormType, id: number, horaires: HorairesType) {
  const response = await fetch(`${api_url}/characteristic/${id}/update`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
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

export async function suspendCharacteristic(data: SuspensionFormType, id: number, status: string) {
  console.log(data);
  const response = await fetch(`${api_url}/characteristic/${id}/suspend`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify({
      "password": data.password,
      "cancel_suspension": status == 'active'? false : true,
      "reason_for_suspension_en": data.reason_for_suspension_en,
      "reason_for_suspension_fr": data.reason_for_suspension_fr
    }),
  })
  return response;
}


export async function deleteCharacteristic(data: ConfirmPasswordType, id: number) {
  console.log(id);
  const response = await fetch(`${api_url}/characteristic/${id}/delete`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}