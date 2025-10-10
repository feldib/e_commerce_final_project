/**
 * Mock for I18nProvider component
 */
import React from "react";

export const useI18n = jest.fn(() => ({
  t: jest.fn((key: string) => key),
  locale: "en",
  setLocale: jest.fn(),
}));

export const I18nProvider = jest.fn(
  ({ children }: { children: React.ReactNode }) => (
    <div data-testid="i18n-provider">{children}</div>
  )
);

export default I18nProvider;
