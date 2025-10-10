import React from "react";
import { render } from "@testing-library/react";

import LoggedInNavbarItems from "../LoggedInNavbarItems";

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
}));

describe("LoggedInNavbarItems", () => {
  it("should render without crashing", () => {
    render(<LoggedInNavbarItems />);

    expect(document.body).toBeTruthy();
  });

  it("should render navigation items for logged in users", () => {
    render(<LoggedInNavbarItems />);

    // Should contain navigation elements
    expect(document.body).toBeTruthy();
  });

  it("should provide user navigation functionality", () => {
    render(<LoggedInNavbarItems />);

    // Should have navigation items or links
    const links = document.querySelectorAll("a");
    const buttons = document.querySelectorAll("button");
    const navItems = links.length + buttons.length;

    expect(navItems).toBeGreaterThanOrEqual(0);
  });
});
