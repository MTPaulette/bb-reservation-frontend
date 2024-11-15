// import { getServerSession } from "next-auth";
{/*import { getSession } from "next-auth/react";

// const session = await getServerSession(requestAnimationFrame, resizeBy,)

const fetchWithAuth = async(url, options = {}) => {
  const session = await getSession();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  const response = await fetch(url, { ... options, headers });
  return response;
};

export const defaultFetch = async(url, options={}) => {
  return fetchWithAuth(url, options);
};

globalThis.fetch = defaultFetch;
*/}
import { getSession } from "next-auth/react";
export const getTokenn = async () => {
  const session = await getSession();
  const t = session?.accessToken;
  // const v = await t.json();
  return session;
};

export const accessToken = (await getSession())

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

export const getToken = () => {
  // const token = sessionStorage.getItem("user");
  //const token = "2|GkscTcM21RErmT1mCtPDAAlene1wEpaRBwSGjrAM7c0220c8";
  const token = "8|No0EQtPZGnYmqT7lsdaXkjlntfgnFvB8f3aGXv9U4f4417d9";

  //client
  //const token = "2|vVhhYcKaZCOln2CLhuWVYxVRMxzscAtK2E4L93Hv33851da1";
  return token; 
};

export const getTokennn = () => {
  // export const getTokenn = (): string | null => {
  const cookieName = 'next-auth.session-token';
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }

  return null;
};



const getTokennnnn = (): string | null => {
  const cookieName = 'next-auth.session-token'; // Remplacez par le nom du cookie que vous avez défini
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }

  return null;
};