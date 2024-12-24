import { headerOptions, getCSRFToken, getToken } from "../utils";
import { ConfirmPasswordType, UserFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function updateProfile(data: UserFormType) {
  const response = await fetch(`${api_url}/profile`, {
    method: "PUT",
    //headers: await headerOptions(),
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function suspendClient(data: ConfirmPasswordType, id: number, status: string) {
  const response = await fetch(`${api_url}/client/${id}/suspend`, {
    method: "PUT",
    headers: await headerOptions(),
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
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function uploadImage(data: FormData) {
  const response = await fetch(`${api_url}/profile/image/store`, { 
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      // Content-Type: image/png
      "Authorization": `Bearer ${await getToken()}`,
      "X-XSRF-TOKEN": `${await getCSRFToken()}`,
      "X-CSRF-TOKEN": `${await getCSRFToken()}`,
      "X-Requested-With": "XMLHttpRequest",
    },
    body: data,
  })
  return response;
}

export async function changePassword(current_password: string, password: string) {
  const response = await fetch(`${api_url}/password`, { 
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify({
      current_password: current_password,
      password: password
    }),
  })
  return response;
}

export async function deleteProfilePic() {
  const response = await fetch(`${api_url}/profile/image/delete`, { 
    method: "PUT",
    headers: await headerOptions(),
  })
  return response;
}