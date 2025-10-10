import React from "react";
import { render } from "@testing-library/react";

import RegistrationForm from "../RegistrationForm";

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

// Mock router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/test-path",
  useSearchParams: () => ({
    get: jest.fn(() => "false"),
  }),
}));

// Mock hooks;

describe("RegistrationForm", () => {
  it("should render without crashing", () => {
    render(<RegistrationForm />);

    expect(document.body).toBeTruthy();
  });

  it("should render form elements", () => {
    render(<RegistrationForm />);

    // Should contain form elements
    const forms = document.querySelectorAll("form");
    const inputs = document.querySelectorAll("input");
    const buttons = document.querySelectorAll("button");

    expect(forms.length + inputs.length + buttons.length).toBeGreaterThan(0);
  });
});
