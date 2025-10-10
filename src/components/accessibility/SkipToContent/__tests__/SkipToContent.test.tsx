import React from "react";
import { render, screen } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";

import SkipToContent from "../SkipToContent";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>{children}</I18nProvider>
);

describe("SkipToContent", () => {
  it("should render skip link", () => {
    render(
      <TestWrapper>
        <SkipToContent />
      </TestWrapper>
    );

    const skipLink = screen.getByRole("link");
    expect(skipLink).toBeTruthy();
  });

  it("should have proper accessibility attributes", () => {
    render(
      <TestWrapper>
        <SkipToContent />
      </TestWrapper>
    );

    const skipLink = screen.getByRole("link");
    expect(skipLink.getAttribute("href")).toBe("#main");
  });

  it("should contain skip text", () => {
    render(
      <TestWrapper>
        <SkipToContent />
      </TestWrapper>
    );

    // The component should contain some skip-related text
    const linkElement = screen.getByRole("link");
    expect(linkElement.textContent).toBeTruthy();
  });
});
