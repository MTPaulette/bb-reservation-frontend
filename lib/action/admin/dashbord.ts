import { headerOptions } from "../../utils";

const api_url = process.env.API_URL;

export async function getStatistics(period: string|undefined) {
  const response = await fetch(`${api_url}/admin/dashboard?period=${period}`, {
    method: "GET",
    headers: await headerOptions(),
  })
  return response;//.json();
}