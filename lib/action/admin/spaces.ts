import { headerOptions, getCSRFToken, getToken, decryptToken } from "../../utils";
import { ConfirmPasswordType, SpaceFormType } from "../../definitions";


const api_url = process.env.API_URL;

export async function createSpace(data: SpaceFormType) {
  const response = await fetch(`${api_url}/admin/space/store`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getSpaces() {
  const response = await fetch(`${api_url}/admin/spaces`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function getSpaceById(id: number) {
  const response = await fetch(`${api_url}/admin/space/${id}`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function updateSpace(data: SpaceFormType, id: number, characteristics: number[]) {
  const response = await fetch(`${api_url}/admin/space/${id}/update`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify({
      "name": data.name,
      "nb_place": data.nb_place,
      "description_en": data.description_en,
      "description_fr": data.description_fr,
      "characteristics": characteristics,
    }),
  })
  return response;
}

export async function deleteSpace(data: ConfirmPasswordType, id: number) {
  console.log(id);
  const response = await fetch(`${api_url}/admin/space/${id}/delete`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function uploadImages(data: FormData, space_id: number) {
  const encryptedToken = await getToken()
  const token = encryptedToken? decryptToken(encryptedToken): "";
  const response = await fetch(`${api_url}/admin/space/${space_id}/image/store`, {
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


export async function deleteImage(image_id: number) {
  const response = await fetch(`${api_url}/admin/space/image/${image_id}/delete`, { 
    method: "PUT",
    headers: await headerOptions(),
  })
  return response;
}