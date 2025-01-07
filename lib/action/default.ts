import { headerOptions } from "../utils";

const api_url = process.env.API_URL;

export async function getRessources() {
  const response = await fetch(`${api_url}/ressources`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}


export async function getCalendar() {
  const response = await fetch(`${api_url}/calendar`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}