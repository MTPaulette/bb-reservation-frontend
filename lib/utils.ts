import { getSession, getCsrfToken } from "next-auth/react";
import moment from 'moment';


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
  return (amount).toLocaleString('fr-FR', {
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

export const getImageUrl = (link : string) => {
  const url = new URL(process.env.API_URL);
  url.pathname = `/storage/${link}`;
  return url.href;
}


export const formatDateTime = (dateTime: moment.MomentInput, lang = 'fr') => {
  moment.locale(lang);
  const now = moment();
  const diff = now.diff(dateTime, 'days');
  if (diff > 7) {
    // return `${moment(dateTime).format('DD/MM/YYYY')} à ${moment(dateTime).format('HH:mm')}`;
    return `${moment(dateTime).format('D MMM YYYY')}  ${moment(dateTime).format('HH:mm')}`;
  } else {
    return `${moment(dateTime).fromNow()}`;
  }
};