import React from "react";
import { render } from "@testing-library/react";

import NotLoggedInNavbarItems from "../NotLoggedInNavbarItems";

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

describe("NotLoggedInNavbarItems", () => {
  it("should render without crashing", () => {
    render(<NotLoggedInNavbarItems />);

    expect(document.body).toBeTruthy();
  });
});
