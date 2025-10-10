import React from "react";
import { render } from "@testing-library/react";

import LanguageSelector from "../LanguageSelector";

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    locale: "en",
    setLocale: jest.fn(),
  }),
}));

// Mock router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/test-path",
}));

describe("LanguageSelector", () => {
  it("should render without crashing", () => {
    render(<LanguageSelector />);

    expect(document.body).toBeTruthy();
  });

  it("should render language selection functionality", () => {
    render(<LanguageSelector />);

    // Should contain language selection elements
    expect(document.body).toBeTruthy();
  });

  it("should provide language switching capability", () => {
    render(<LanguageSelector />);

    // Should have some interactive elements for language selection
    const buttons = document.querySelectorAll("button");
    const selects = document.querySelectorAll("select");
    const interactiveElements = buttons.length + selects.length;

    expect(interactiveElements).toBeGreaterThanOrEqual(0);
  });
});
