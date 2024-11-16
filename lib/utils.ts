import { getSession, getCsrfToken } from "next-auth/react";

export const getToken = async () => {
  const session = await getSession();
  // return session?.user.token;
  return session?.accessToken;
};

export const getCSRFToken = async () => {
  return await getCsrfToken();
};

export const capitalize = (str: string) => {
  return str? str.charAt(0).toUpperCase() + str.slice(1): "";
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XAF',
  });
};

export const getUsername = (lastname: string, firstname: string) => {
  return capitalize(firstname)+" "+lastname.toUpperCase();
}

export const headerOptions = (csrftoken: string|undefined, token: string|undefined) => {
  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-XSRF-TOKEN": `${csrftoken}`,
    "X-CSRF-TOKEN": `${csrftoken}`,
    "X-Requested-With": "XMLHttpRequest",
    "Authorization": `Bearer ${token}`,
  }
}
