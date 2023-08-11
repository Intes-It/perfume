import fr from "../locales/fr.json";
import vi from "../locales/vi.json";
import ae from "../locales/ae.json";
import en from "../locales/en.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
type ConvertedToObjectType<T> = {
  [P in keyof T]: T[P] extends string ? string : ConvertedToObjectType<T[P]>;
};
type TranslationJsonType = typeof import("../locales/fr.json");
export const translations: ConvertedToObjectType<TranslationJsonType> = {} as any;
const convertLanguageJsonToObject = (
  json: any,
  objToConvertTo = translations,
  current?: string
) => {
  Object.keys(json).forEach((key) => {
    const currentLookupKey = current ? `${current}.${key}` : key;
    if (typeof json[key] === "object") {
      (objToConvertTo as any)[key] = {};
      convertLanguageJsonToObject(
        json[key],
        (objToConvertTo as any)[key],
        currentLookupKey
      );
    } else {
      (objToConvertTo as any)[key] = currentLookupKey;
    }
  });
};
convertLanguageJsonToObject(en);
convertLanguageJsonToObject(fr);
convertLanguageJsonToObject(vi);
convertLanguageJsonToObject(ae);
i18n.use(initReactI18next).init({
  resources: {
    fr: {translation: fr},
    en: {translation: en},
    vn: {translation: vi},
    ae: {translation: ae},
  },
  lng: "fr",
  interpolation: {
    escapeValue: false,
  },
}).then(r =>console.log(r));

export default i18n;
