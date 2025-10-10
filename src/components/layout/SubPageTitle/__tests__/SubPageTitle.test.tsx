import React from "react";
import { render, screen } from "@testing-library/react";

import SubPageTitle from "../SubPageTitle";

describe("SubPageTitle", () => {
  it("should render subtitle text correctly", () => {
    const testSubtitle = "Test Sub Page Title";

    render(<SubPageTitle title={testSubtitle} />);

    expect(screen.getByText(testSubtitle)).toBeTruthy();
  });

  it("should render with proper heading structure", () => {
    const testSubtitle = "Another Test Subtitle";

    render(<SubPageTitle title={testSubtitle} />);

    const subtitleElement = screen.getByText(testSubtitle);
    expect(subtitleElement.tagName.toLowerCase()).toBe("h2");
  });
});
