import React from "react";
import { render } from "@testing-library/react";

import Header from "../Header";

// Use reusable mocks
jest.mock("next/navigation");
jest.mock("@/components/providers/I18nProvider/I18nProvider");

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
