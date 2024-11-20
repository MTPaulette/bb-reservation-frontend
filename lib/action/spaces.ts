import { headerOptions, getCSRFToken, getToken } from "../utils";
import { ConfirmPasswordType, SpaceFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function createSpace(data: SpaceFormType) {
  const response = await fetch(`${api_url}/space/store`, { 
    method: "POST",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getSpaces() {
  const response = await fetch(`${api_url}/spaces`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken())
  })
  return response;
}

export async function getSpaceById(id: number) {
  const response = await fetch(`${api_url}/space/${id}`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken())
  })
  return response;
}

export async function updateSpace(data: SpaceFormType, id: number, characteristics: number[]) {
  const response = await fetch(`${api_url}/space/${id}/update`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
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
  const response = await fetch(`${api_url}/space/${id}/delete`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function uploadImages(data: FormData, space_id: number) {
  const response = await fetch(`${api_url}/space/${space_id}/image/store`, { 
    method: "POST",
    headers: {
      "Authorization": `Bearer ${await getToken()}`,
      "X-XSRF-TOKEN": `${await getCSRFToken()}`,
      "X-CSRF-TOKEN": `${await getCSRFToken()}`,
      "X-Requested-With": "XMLHttpRequest",
      // 'Content-Type': 'multipart/form-data',
    },
    body: data,
  })
  return response;
}

export async function deleteImage(image_id: number) {
  const response = await fetch(`${api_url}/space/image/${image_id}/delete`, { 
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
  })
  return response;
}