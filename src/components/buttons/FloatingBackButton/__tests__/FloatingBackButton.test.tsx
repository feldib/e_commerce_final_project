import React from "react";
import { render, screen } from "@testing-library/react";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import FloatingBackButton from "../FloatingBackButton";

// Mock router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe("FloatingBackButton", () => {
  const mockRouter = {
    back: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  } as AppRouterInstance;

  it("should render without crashing", () => {
    render(<FloatingBackButton router={mockRouter} />);

    expect(document.body).toBeTruthy();
  });

  it("should render button element", () => {
    render(<FloatingBackButton router={mockRouter} />);

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();
  });

  it("should display back button", () => {
    render(<FloatingBackButton router={mockRouter} />);

    // Should display button even without text
    expect(screen.getByRole("button")).toBeTruthy();
  });
});
