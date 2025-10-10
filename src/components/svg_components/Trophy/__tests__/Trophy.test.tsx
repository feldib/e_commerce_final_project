import React from "react";
import { render } from "@testing-library/react";

import Trophy from "../Trophy";

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe("Trophy", () => {
  const mockProps = {
    height: "24",
    filled: false,
  };

  it("should render without crashing", () => {
    render(<Trophy {...mockProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should render SVG element", () => {
    render(<Trophy {...mockProps} />);

    const svg = document.querySelector("svg");
    expect(svg).toBeTruthy();
  });

  it("should render with filled state", () => {
    const filledProps = { ...mockProps, filled: true };
    render(<Trophy {...filledProps} />);

    expect(document.querySelector("svg")).toBeTruthy();
  });

  it("should render with unfilled state", () => {
    const filledProps = { ...mockProps, filled: false };
    render(<Trophy {...filledProps} />);

    expect(document.querySelector("svg")).toBeTruthy();
  });
});
