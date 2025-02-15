import { getSession, getCsrfToken } from "next-auth/react";
import * as crypto from 'crypto';
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
  if(lastname != "" && firstname != "") {
    return capitalize(firstname)+" "+lastname.toUpperCase();
  }
  return "";
}

export const headerOptions = async () => {
  const csrftoken = await getCSRFToken();
  const encryptedToken = await getToken()
  const token = encryptedToken? decryptToken(encryptedToken): "";
  console.log("encryptToken: "+encryptedToken);
  console.log("decryptToken: "+token);
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
  if(process.env.API_URL) {
  const url = new URL(process.env.API_URL);
  url.pathname = `/storage/${link}`;
  return url.href;
  }
  return "";
}


export const formatDateTime = (dateTime: moment.MomentInput, lang = 'fr') => {
  moment.locale(lang);
  moment.localeData();
  const now = moment(); //moment().utcOffset(120);  definir le fuseau horaire sur GMT+1 : 60min = 1h
  const diff = now.diff(dateTime, 'days');
  if (diff > 7) {
    return `${moment(dateTime).format('D MMM YYYY')}  ${moment(dateTime).format('HH:mm')}`;
  } else {
    return `${moment(dateTime).fromNow()}`;
  }
}

export const startAndEndOfWeek = (date: moment.MomentInput) => {
  const startOfWeek = moment(date).startOf('week').format('DD.MM.YYYY');
  const endOfWeek = moment(date).endOf('week').format('DD.MM.YYYY');

  return {
    startOfWeek, endOfWeek
  }
}


const encryptionKey = process.env.ENCRYPTION_KEY;
const algorithm = "aes-256-cbc";
const key =
  crypto
    .createHash("sha256").update(String(encryptionKey))
    .digest("base64").substring(0, 32);

const iv =
  crypto
    .createHash("sha256").update(String(encryptionKey))
    .digest("base64").substring(0, 16);

export const encryptToken = (token: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypt_token = Buffer.concat([cipher.update(token), cipher.final()]);
  const encryptedToken = encrypt_token.toString('hex');

  return encryptedToken;
};

export const decryptToken = (encryptedToken: string) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  decipher.setAutoPadding(false);
  const decrypt_token = Buffer.concat([decipher.update(Buffer.from(encryptedToken, 'hex')), decipher.final()]);
  const decryptedToken = decrypt_token.toString();

  return decryptedToken;
};