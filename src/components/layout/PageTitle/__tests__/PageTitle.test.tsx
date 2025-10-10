import React from "react";
import { render, screen } from "@testing-library/react";

import PageTitle from "../PageTitle";

describe("PageTitle", () => {
  it("should render title text correctly", () => {
    const testTitle = "Test Page Title";

    render(<PageTitle title={testTitle} />);

    expect(screen.getByText(testTitle)).toBeTruthy();
  });

  it("should render with proper heading structure", () => {
    const testTitle = "Another Test Title";

    render(<PageTitle title={testTitle} />);

    const titleElement = screen.getByText(testTitle);
    expect(titleElement.tagName.toLowerCase()).toBe("h1");
  });
});
