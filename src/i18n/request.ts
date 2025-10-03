import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { SUPPORTED_LOCALES } from "@/utils/constants";

export const locales = SUPPORTED_LOCALES;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    locale: locale as string, // Cast to non-nullable string
  };
});
