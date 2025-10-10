import React from "react";
import { render } from "@testing-library/react";

import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";

import SubNavbar from "../SubNavbar";

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

describe("SubNavbar", () => {
  const mockLinkObjects = [
    {
      linkTo: "/home",
      icon: faHome,
      linkText: "Home",
    },
    {
      linkTo: "/user",
      icon: faUser,
      linkText: "User",
    },
  ];

  it("should render without crashing", () => {
    render(<SubNavbar linkObjects={mockLinkObjects} />);

    expect(document.body).toBeTruthy();
  });

  it("should render navbar element", () => {
    render(<SubNavbar linkObjects={mockLinkObjects} />);

    const navbar =
      document.querySelector("nav") ||
      document.querySelector('[role="navigation"]');
    expect(navbar).toBeTruthy();
  });

  it("should render navigation items", () => {
    render(<SubNavbar linkObjects={mockLinkObjects} />);

    // Should render the number of links provided
    const links = document.querySelectorAll("a");
    expect(links.length).toBeGreaterThan(0);
  });
});
