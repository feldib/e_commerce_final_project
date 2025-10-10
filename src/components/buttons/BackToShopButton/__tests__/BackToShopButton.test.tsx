import React from "react";
import { render, screen } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";

import BackToShopButton from "../BackToShopButton";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>{children}</I18nProvider>
);

describe("BackToShopButton", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render button", () => {
    render(
      <TestWrapper>
        <BackToShopButton onClick={mockOnClick} />
      </TestWrapper>
    );

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();
  });

  it("should contain link to shop", () => {
    render(
      <TestWrapper>
        <BackToShopButton onClick={mockOnClick} />
      </TestWrapper>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute("href")).toBe("/");
  });

  it("should have button text", () => {
    render(
      <TestWrapper>
        <BackToShopButton onClick={mockOnClick} />
      </TestWrapper>
    );

    const button = screen.getByRole("button");
    expect(button.textContent).toBeTruthy();
  });
});
