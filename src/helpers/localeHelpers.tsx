import {
  STORAGE_KEYS,
  SUPPORTED_LOCALES,
  SupportedLocale,
} from "@/utils/constants";

const getStoredLocale = <T extends string>(): T | null => {
  if (typeof window === "undefined") return null;

  const storedLocale = localStorage.getItem(STORAGE_KEYS.USER_LOCALE);
  return storedLocale &&
    SUPPORTED_LOCALES.includes(storedLocale as SupportedLocale)
    ? (storedLocale as T)
    : null;
};

const setStoredLocale = <T extends string>(locale: T) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.USER_LOCALE, locale);
  }
};

export { getStoredLocale, setStoredLocale };
