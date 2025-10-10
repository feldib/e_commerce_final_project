import React from "react";
import { act, render, screen } from "@testing-library/react";

import I18nProvider, { useI18n } from "../I18nProvider";

// Mock the locale helpers
jest.mock("@/helpers/localeHelpers", () => ({
  getStoredLocale: jest.fn(() => "en"),
  setStoredLocale: jest.fn(),
}));

// Test component to use the hook
function TestComponent() {
  const { locale, t } = useI18n();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="translation">{t("common.actions.submit")}</span>
    </div>
  );
}

describe("I18nProvider", () => {
  beforeEach(() => {
    // Mock document
    Object.defineProperty(document, "documentElement", {
      value: {
        lang: "",
        dir: "",
      },
      writable: true,
    });
  });

  it("should render without crashing", () => {
    render(
      <I18nProvider>
        <div>Test Content</div>
      </I18nProvider>
    );
    expect(screen.getByText("Test Content")).toBeTruthy();
  });

  it("should provide i18n context to children", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId("locale")).toBeTruthy();
    expect(screen.getByTestId("translation")).toBeTruthy();
  });

  it("should default to 'en' locale", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId("locale").textContent).toBe("en");
  });

  it("should throw error when useI18n is used outside provider", () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useI18n must be used within an I18nProvider");

    console.error = originalError;
  });

  it("should return key when translation is not found", () => {
    function TestComponentWithMissingKey() {
      const { t } = useI18n();
      return <span data-testid="missing-key">{t("nonexistent.key")}</span>;
    }

    render(
      <I18nProvider>
        <TestComponentWithMissingKey />
      </I18nProvider>
    );

    expect(screen.getByTestId("missing-key").textContent).toBe(
      "nonexistent.key"
    );
  });

  it("should handle locale changes", () => {
    function TestComponentWithLocaleChange() {
      const { locale, setLocale } = useI18n();

      const handleClick = () => {
        setLocale("he");
      };

      return (
        <div>
          <span data-testid="current-locale">{locale}</span>
          <button onClick={handleClick}>Change Locale</button>
        </div>
      );
    }

    render(
      <I18nProvider>
        <TestComponentWithLocaleChange />
      </I18nProvider>
    );

    expect(screen.getByTestId("current-locale").textContent).toBe("en");

    act(() => {
      screen.getByText("Change Locale").click();
    });

    expect(screen.getByTestId("current-locale").textContent).toBe("he");
  });
});
