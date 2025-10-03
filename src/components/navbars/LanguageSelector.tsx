"use client";

import { HU, IL, US } from "country-flag-icons/react/3x2";

import { useI18n } from "@/components/providers/I18nProvider";

const LanguageSelector = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className="d-flex justify-content-start align-items-center w-100"
      style={{ gap: "12px" }}
    >
      <US
        className="flag-icon"
        height="18"
        onClick={() => setLocale("en")}
        style={{
          opacity: locale === "en" ? 1 : 0.6,
          cursor: "pointer",
        }}
      />

      <IL
        className="flag-icon"
        height="18"
        onClick={() => setLocale("he")}
        style={{
          opacity: locale === "he" ? 1 : 0.6,
          cursor: "pointer",
        }}
      />

      <HU
        className="flag-icon"
        height="18"
        onClick={() => setLocale("hu")}
        style={{
          opacity: locale === "hu" ? 1 : 0.6,
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default LanguageSelector;
