import React from "react";
import { render, screen } from "@testing-library/react";

import SkipToContent from "../SkipToContent";

// Use reusable mocks
jest.mock("@/components/providers/I18nProvider/I18nProvider");

describe("SkipToContent", () => {
  it("should render skip link", () => {
    render(<SkipToContent />);

    const skipLink = screen.getByRole("link");
    expect(skipLink).toBeTruthy();
  });

  it("should have proper accessibility attributes", () => {
    render(<SkipToContent />);

    const skipLink = screen.getByRole("link");
    expect(skipLink.getAttribute("href")).toBe("#main");
  });

  it("should contain skip text", () => {
    render(<SkipToContent />);

    // The component should contain some skip-related text
    const linkElement = screen.getByRole("link");
    expect(linkElement.textContent).toBeTruthy();
  });
});
