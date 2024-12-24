import { headerOptions } from "../utils";
import { PaymentFormType } from "../definitions";

const api_url = process.env.API_URL;

export async function createdPayment(data: PaymentFormType, reservation_id: number) {
  const response = await fetch(`${api_url}/payment/store`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify({
      "reservation_id": reservation_id,
      "amount": data.amount,
      "payment_method": data.payment_method,
      "transaction_id": data.transaction_id,
      "bill_number": data.bill_number,
      "note": data.note,
    }),
  })
  return response;
}

export async function getPayments() {
  const response = await fetch(`${api_url}/payments`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function getPaymentById(id: number) {
  const response = await fetch(`${api_url}/payment/${id}`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function updatePayment(data: PaymentFormType, id: number, reservation_id:number) {
  const response = await fetch(`${api_url}/payment/${id}/update`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify({
      "reservation_id": reservation_id,
      "amount": data.amount,
      "payment_method": data.payment_method,
      "transaction_id": data.transaction_id,
      "bill_number": data.bill_number,
      "note": data.note,
    }),
  })
  return response;
}

