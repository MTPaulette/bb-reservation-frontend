import { headerOptions, getCSRFToken, getToken, decryptToken } from "../utils";
import { UserFormType } from "../definitions";

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

export async function uploadImage(data: FormData) {
  const encryptedToken = await getToken()
  const token = encryptedToken? decryptToken(encryptedToken): "";
  const response = await fetch(`${api_url}/profile/image/store`, { 
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      // Content-Type: image/png
      "Authorization": `Bearer ${token}`,
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