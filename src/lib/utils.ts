import en from "./content/en.json";
import ar from "./content/ar.json";

const dictionaries = { en, ar } as const;

type Lang = keyof typeof dictionaries;

export function getDictionary(lang: Lang) {
  return dictionaries[lang];
}
