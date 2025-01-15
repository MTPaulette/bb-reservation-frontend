import { headerOptions } from "../utils";
import { AuthUserType } from "../definitions";

const api_url = process.env.API_URL;

//register
export async function createAccount(data: AuthUserType) {
  const response = await fetch(`${api_url}/register`, {
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify(data),
  })
  return response;
}



export async function logoutUser() {
  const response = await fetch(`${api_url}/logout`, {
    method: "DELETE",
    headers: await headerOptions(),
    credentials: "same-origin",
  });

  return response;
}

//forgot-password
export async function forgotPassword(email: string) {
  const response = await fetch(`${api_url}/forgot-password`, {
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify({
      "email": email,
    }),
  })
  return response;
}

//reset-password
export async function resetPassword(email: string, password: string, token:  string) {
  const response = await fetch(`${api_url}/reset-password`, {
    method: "POST",
    headers: await headerOptions(),
    body: JSON.stringify({
      "email": email,
      "password": password,
      "token": token,
    }),
  })
  return response;
}

// show user profile
export async function getProfile() {
  const response = await fetch(`${api_url}/profile`, {
    method: "GET",
    headers: await headerOptions(),
  })
  return response;
}


// token: this.$route.query.token,
// email: this.email,
// password: this.password,