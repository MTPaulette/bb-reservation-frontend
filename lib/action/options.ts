import { HolidayType, OptionType } from "../definitions";
import { headerOptions, getCSRFToken, getToken } from "../utils";

const api_url = process.env.API_URL;

export async function getOptions() {
  const response = await fetch(`${api_url}/options`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken()),
  })
  return response;//.json();
}

export async function saveOptions(data: OptionType) {
  const response = await fetch(`${api_url}/option/store`, { 
    method: "POST",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify({
      options: data
    }),
  })
  return response;
}


export async function saveHolidays(data: HolidayType[]) {
  const response = await fetch(`${api_url}/option/holidays/store`, { 
    method: "POST",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify({
      holidays: data,
    }),
  })
  return response;
}