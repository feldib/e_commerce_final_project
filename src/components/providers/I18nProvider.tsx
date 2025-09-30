"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

import en from "../../../messages/en.json";
import he from "../../../messages/he.json";
import hu from "../../../messages/hu.json";

type Locale = "en" | "he" | "hu";
type Messages = typeof en;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const messages: Record<Locale, Messages> = {
  en,
  he,
  hu,
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = messages[locale];

    for (const k of keys) {
      if (typeof value === "object" && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if path doesn't exist
      }
    }

    return typeof value === "string" ? value : key;
  };

  // Update document direction when locale changes
  React.useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "he" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export default I18nProvider;
