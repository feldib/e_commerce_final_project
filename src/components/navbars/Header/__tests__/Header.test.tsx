import React from "react";
import { render } from "@testing-library/react";

import Header from "../Header";

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
}));

// Mock the providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    locale: "en",
    setLocale: jest.fn(),
  }),
}));

describe("Header", () => {
  it("should render without crashing", () => {
    render(<Header />);

    // Just verify it renders without throwing
    expect(document.body).toBeTruthy();
  });

  it("should render header element", () => {
    render(<Header />);

    // Look for common header elements that likely exist
    const element =
      document.querySelector("header") ||
      document.querySelector('[role="banner"]') ||
      document.querySelector("nav");

    expect(element).toBeTruthy();
  });
});
