import { headerOptions } from "../utils";
import { ConfirmPasswordType, CharacteristicFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function newCharacteristic(data: CharacteristicFormType) {
  const response = await fetch(`${api_url}/characteristic/store`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getCharacteristics() {
  const response = await fetch(`${api_url}/characteristics`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function updateCharacteristic(data: CharacteristicFormType, id: number) {
  const response = await fetch(`${api_url}/characteristic/${id}/update`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function deleteCharacteristic(data: ConfirmPasswordType, id: number) {
  console.log(id);
  const response = await fetch(`${api_url}/characteristic/${id}/delete`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}