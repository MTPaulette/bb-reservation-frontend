import { HolidayType, OptionType } from "../../definitions";
import { headerOptions } from "../../utils";

const api_url = process.env.API_URL;

export async function getOptions() {
  const response = await fetch(`${api_url}/admin/options`, {
    method: "GET",
    headers: await headerOptions(),
  })
  return response;//.json();
}

export async function saveOptions(data: OptionType) {
  const response = await fetch(`${api_url}/admin/option/store`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify({
      options: data
    }),
  })
  return response;
}


export async function saveHolidays(data: HolidayType[]) {
  const response = await fetch(`${api_url}/admin/option/holidays/store`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify({
      holidays: data,
    }),
  })
  return response;
}