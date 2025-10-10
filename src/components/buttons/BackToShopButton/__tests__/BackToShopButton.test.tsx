import React from "react";
import { render, screen } from "@testing-library/react";

import BackToShopButton from "../BackToShopButton";

// Use reusable mocks
jest.mock("@/components/providers/I18nProvider/I18nProvider");

describe("BackToShopButton", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render button", () => {
    render(<BackToShopButton onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();
  });

  it("should contain link to shop", () => {
    render(<BackToShopButton onClick={mockOnClick} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute("href")).toBe("/");
  });

  it("should have button text", () => {
    render(<BackToShopButton onClick={mockOnClick} />);

    const button = screen.getByRole("button");
    expect(button.textContent).toBeTruthy();
  });
});
