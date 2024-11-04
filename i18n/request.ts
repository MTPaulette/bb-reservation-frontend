import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";


export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if(!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (
      await (locale === 'fr'
        ? import(`@/public/locales/fr.json`)
        : import(`@/public/locales/${locale}.json`))
    ).default
  };

});