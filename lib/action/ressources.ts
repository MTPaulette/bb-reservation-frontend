import { headerOptions, getCSRFToken, getToken } from "../utils";
import { ConfirmPasswordType, RessourceFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function createRessource(data: RessourceFormType) {
  const response = await fetch(`${api_url}/ressource/store`, { 
    method: "POST",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getRessources() {
  const response = await fetch(`${api_url}/ressources`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken())
  })
  return response;
}

export async function getRessourceById(id: number) {
  const response = await fetch(`${api_url}/ressource/${id}`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken())
  })
  return response;
}

export async function updateRessource(data: RessourceFormType, id: number, characteristics: number[]) {
  const response = await fetch(`${api_url}/ressource/${id}/update`, {
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

export async function deleteRessource(data: ConfirmPasswordType, id: number) {
  console.log(id);
  const response = await fetch(`${api_url}/ressource/${id}/delete`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function uploadImages(data: FormData, ressource_id: number) {
  const response = await fetch(`${api_url}/ressource/${ressource_id}/image/store`, { 
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
  const response = await fetch(`${api_url}/ressource/image/${image_id}/delete`, { 
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
  })
  return response;
}