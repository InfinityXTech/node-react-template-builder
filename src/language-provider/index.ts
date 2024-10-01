import enLang from "./entries/en-us.ts";
import itLang from "./entries/it-it.ts";
import vnLang from "./entries/vi-vn.ts";

export const AppLanguages = [
  {
    languageId: "vietnamese",
    locale: "vi",
    name: "Vietnamese",
    icon: "vn",
  },
  {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "us",
  },
  {
    languageId: "italian",
    locale: "it",
    name: "Italiano",
    icon: "it",
  },
];

const AppLocale: { [index: string]: any } = {
  en: enLang,
  vi: vnLang,
  it: itLang,
};

export default AppLocale;
