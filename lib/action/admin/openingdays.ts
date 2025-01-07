import { headerOptions } from "../../utils";

const api_url = process.env.API_URL;

export async function getOpeningdays() {
  const response = await fetch(`${api_url}/admin/openingdays`, {
    method: "GET",
    headers: await headerOptions(),
  })
  return response.json();
}
