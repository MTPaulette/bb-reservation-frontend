import { headerOptions } from "../../utils";
import { ReservationFormType, CancellationFormType } from "../../definitions";

const api_url = process.env.API_URL;

export async function createReservation(data: ReservationFormType) {
  const response = await fetch(`${api_url}/admin/reservation/store`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getReservations() {
  const response = await fetch(`${api_url}/admin/reservations`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function getReservationById(id: number) {
  const response = await fetch(`${api_url}/admin/reservation/${id}`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function updateReservation(data: ReservationFormType, id: number) {
  const response = await fetch(`${api_url}/admin/reservation/${id}/update`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify(data)
  })
  return response;
}

export async function cancelReservation(data: CancellationFormType, id: number, state: string) {
  const response = await fetch(`${api_url}/admin/reservation/${id}/cancel`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify({
      "password": data.password,
      "undo_cancellation": state != 'cancelled'? false : true,
      "reason_for_cancellation": data.reason_for_cancellation,
    }),
  })
  return response;
}

export async function confirmReservation(client_id: number, ressource_id: number) {
  const response = await fetch(`${api_url}/admin/reservation/store/confirm`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify({
      "client_id": client_id,
      "ressource_id": ressource_id
    }),
  })
  return response;
}

export async function getCalendar() {
  const response = await fetch(`${api_url}/admin/calendar`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}