import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Query from "../Query";

// Mock I18n provider
jest.mock("@/components/providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe("Query", () => {
  const defaultProps = {
    text: "Test Query Filter",
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<Query {...defaultProps} />);
    expect(document.body).toBeTruthy();
  });

  it("should render query text", () => {
    render(<Query {...defaultProps} />);
    expect(screen.getByText("Test Query Filter")).toBeTruthy();
  });

  it("should render remove button", () => {
    render(<Query {...defaultProps} />);
    const removeButton = screen.getByRole("button");
    expect(removeButton).toBeTruthy();
    expect(removeButton.textContent).toBe("❌");
  });

  it("should call remove function when button is clicked", () => {
    render(<Query {...defaultProps} />);
    const removeButton = screen.getByRole("button");

    fireEvent.click(removeButton);
    expect(defaultProps.remove).toHaveBeenCalledTimes(1);
  });

  it("should have proper accessibility attributes", () => {
    render(<Query {...defaultProps} />);
    const removeButton = screen.getByRole("button");

    expect(removeButton.getAttribute("aria-label")).toBe(
      "components.query.aria_label_remove_filter"
    );
  });

  it("should render filter icon", () => {
    const { container } = render(<Query {...defaultProps} />);
    const filterIcon = container.querySelector('[data-icon="filter"]');
    expect(filterIcon).toBeTruthy();
  });

  it("should handle different text props", () => {
    render(<Query remove={jest.fn()} text="Different Filter Text" />);
    expect(screen.getByText("Different Filter Text")).toBeTruthy();
  });

  it("should apply correct styling", () => {
    const { container } = render(<Query {...defaultProps} />);

    const filterIcon = container.querySelector('[data-icon="filter"]');
    expect(filterIcon?.getAttribute("style")).toContain("color: red");
    expect(filterIcon?.getAttribute("style")).toContain(
      "border: 2px solid red"
    );
  });
});
