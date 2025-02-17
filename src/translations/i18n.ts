import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { AppConfig } from "@config/config";
import { resources } from "./resources";

const getTranslationsKeys = (obj: Resource) => Object.keys(obj[Object.keys(obj)[0]]);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en"],
    ns: getTranslationsKeys(resources),
    resources,
    interpolation: {
      escapeValue: false
    },
    returnNull: false,
    react: {
      useSuspense: false,
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"]
    },
    detection: {
      order: ["path", "navigator", "querystring", "cookie", "localStorage", "sessionStorage", "htmlTag", "subdomain"]
    },
    debug: AppConfig.i18nDebugMode
  });

export default i18n;
