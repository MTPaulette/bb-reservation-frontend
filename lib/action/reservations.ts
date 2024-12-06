import { headerOptions, getCSRFToken, getToken } from "../utils";
import { ConfirmPasswordType, ReservationFormType, CancellationFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function createReservation(data: ReservationFormType) {
  const response = await fetch(`${api_url}/reservation/store`, { 
    method: "POST",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getReservations() {
  const response = await fetch(`${api_url}/reservations`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken())
  })
  return response;
}

export async function getReservationById(id: number) {
  const response = await fetch(`${api_url}/reservation/${id}`, {
    method: "GET",
    headers: headerOptions(await getCSRFToken(), await getToken())
  })
  return response;
}

export async function updateReservation(data: ReservationFormType, id: number) {
  const response = await fetch(`${api_url}/reservation/${id}/update`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify(data)
  })
  return response;
}

export async function cancelReservation(data: CancellationFormType, id: number, state: string) {
  const response = await fetch(`${api_url}/reservation/${id}/cancel`, {
    method: "PUT",
    headers: headerOptions(await getCSRFToken(), await getToken()),
    body: JSON.stringify({
      "password": data.password,
      "undo_cancellation": state != 'cancelled'? false : true,
      "reason_for_cancellation": data.reason_for_cancellation,
    }),
  })
  return response;
}