import { headerOptions, getCSRFToken, getToken } from "../utils";
import { ConfirmPasswordType, SuspensionFormType, UserFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function createStaff(data: UserFormType) {
  const response = await fetch(`${api_url}/staff/store`, { 
    method: "POST",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getStaff() {
  const response = await fetch(`${api_url}/staff`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken()),
  })
  return response;//.json();
}

export async function getStaffById(id: number) {
  const response = await fetch(`${api_url}/staff/${id}`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken()),
  })
  return response;
}

export async function updateStaff(data: UserFormType, id: number) {
  const response = await fetch(`${api_url}/staff/${id}/update`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function suspendStaff(data: SuspensionFormType, id: number, status: string) {
  const response = await fetch(`${api_url}/staff/${id}/suspend`, {
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


export async function deleteStaff(data: ConfirmPasswordType, id: number) {
  const response = await fetch(`${api_url}/staff/${id}/delete`, { 
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}