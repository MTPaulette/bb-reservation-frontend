import { headerOptions } from "../../utils";

const api_url = process.env.API_URL;

export async function getStatistics() {
  const response = await fetch(`${api_url}/admin/dashboard`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;//.json();
}