import { getSession, getCsrfToken } from "next-auth/react";
import moment from 'moment';
import * as crypto from 'crypto';


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

export const headerOptions = async () => {
// export const headerOptions = async (csrftokenn: string|undefined, tokenn: string|undefined) => {
  const csrftoken = await getCSRFToken();
  const token = await getToken()
  console.log("========================");
  console.log("token: "+token);
  // console.log("encryptToken: "+encryptToken(token));
  // console.log("decryptToken: "+decryptToken(token));
  console.log("csrftoken: "+csrftoken);
  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-XSRF-TOKEN": `${csrftoken}`,
    "X-CSRF-TOKEN": `${csrftoken}`,
    "X-Requested-With": "XMLHttpRequest",
    // "Authorization": `Bearer ${decryptToken(token)}`,
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

const encryptionKey = process.env.ENCRYPTION_KEY;

export const encryptToken = (token: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  const encryptedToken = Buffer.concat([cipher.update(token), cipher.final()]);

  return encryptedToken.toString('hex');
};

export const decryptToken = (encryptedToken: string) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, crypto.randomBytes(16));
  decipher.setAutoPadding(false);
  const decryptedToken = Buffer.concat([decipher.update(Buffer.from(encryptedToken, 'hex')), decipher.final()]);

  return decryptedToken.toString();
};