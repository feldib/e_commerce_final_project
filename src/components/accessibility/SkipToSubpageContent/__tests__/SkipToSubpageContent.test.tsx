import React from "react";
import { render } from "@testing-library/react";

import SkipToSubpageContent from "../SkipToSubpageContent";

// Mock the I18n hook
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: jest.fn(() => ({
    t: (key: string) => key,
  })),
}));

describe("SkipToSubpageContent", () => {
  it("should render without crashing", () => {
    render(<SkipToSubpageContent />);

    expect(document.body).toBeTruthy();
  });

  it("should render skip link", () => {
    render(<SkipToSubpageContent />);

    const link = document.querySelector("a");
    expect(link).toBeTruthy();
  });

  it("should have correct href attribute", () => {
    render(<SkipToSubpageContent />);

    const link = document.querySelector("a");
    expect(link?.getAttribute("href")).toBe("#subpage");
  });
});
