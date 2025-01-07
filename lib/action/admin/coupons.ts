import { headerOptions } from "../../utils";
import { ConfirmPasswordType, CouponFormType } from "../../definitions";

const api_url = process.env.API_URL;

export async function createCoupon(data: CouponFormType) {
  const response = await fetch(`${api_url}/admin/coupon/store`, { 
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function getCoupons() {
  const response = await fetch(`${api_url}/admin/coupons`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function getCouponById(id: number) {
  const response = await fetch(`${api_url}/admin/coupon/${id}`, {
    method: "GET",
    headers: await headerOptions()
  })
  return response;
}

export async function updateCoupon(data: CouponFormType, id: number, clients: number[]) {
  const response = await fetch(`${api_url}/admin/coupon/${id}/update`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify({
      "name": data.name,
      "total_usage": data.total_usage,
      "percent": data.percent,
      "amount": data.amount,
      "expired_on": data.expired_on,
      "note_en": data.note_en,
      "note_fr": data.note_fr,
      "clients": clients,
    }),
  })
  return response;
}

export async function deleteCoupon(data: ConfirmPasswordType, id: number) {
  console.log(id);
  const response = await fetch(`${api_url}/admin/coupon/${id}/delete`, {
    method: "PUT",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}

export async function applyCoupon(coupon: string, client_id: number) {
  const response = await fetch(`${api_url}/admin/coupon/apply`, {
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify({
      "coupon": coupon,
      "client_id": client_id
    }),
  })
  return response;
}
