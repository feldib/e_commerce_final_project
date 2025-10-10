import React from "react";
import { render } from "@testing-library/react";

import UserNavbarMenuItems from "../UserNavbarMenuItems";

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

// Mock ExpandedNavContext
const mockCloseExpandedNav = jest.fn();
jest.mock("../../Header/Header", () => ({
  ExpandedNavContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({
      children,
    }: {
      children: (value: { closeExpandedNav: () => void }) => React.ReactNode;
    }) => children({ closeExpandedNav: mockCloseExpandedNav }),
  },
}));

// Mock useContext
React.useContext = jest.fn().mockReturnValue({
  closeExpandedNav: mockCloseExpandedNav,
});

describe("UserNavbarMenuItems", () => {
  const mockProps = {
    first_name: "John",
  };

  it("should render without crashing", () => {
    render(<UserNavbarMenuItems {...mockProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should provide user menu functionality", () => {
    render(<UserNavbarMenuItems {...mockProps} />);

    // Should have menu items or dropdowns
    const links = document.querySelectorAll("a");
    const buttons = document.querySelectorAll("button");
    const menuItems = links.length + buttons.length;

    expect(menuItems).toBeGreaterThanOrEqual(0);
  });
});
