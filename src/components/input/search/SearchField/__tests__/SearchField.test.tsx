import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import SearchField from "../SearchField";

describe("SearchField", () => {
  const mockProps = {
    what: "Search for:",
    name: "search",
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render search input", () => {
    render(<SearchField {...mockProps} />);

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeTruthy();
  });

  it("should display placeholder text", () => {
    render(<SearchField {...mockProps} />);

    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeTruthy();
  });

  it("should display current value", () => {
    const propsWithValue = { ...mockProps, value: "test search" };
    render(<SearchField {...propsWithValue} />);

    const searchInput = screen.getByDisplayValue("test search");
    expect(searchInput).toBeTruthy();
  });

  it("should call onChange when typing", () => {
    render(<SearchField {...mockProps} />);

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "new search" } });

    expect(mockProps.onChange).toHaveBeenCalled();
  });

  it("should have correct name attribute", () => {
    render(<SearchField {...mockProps} />);

    const searchInput = screen.getByRole("textbox");
    expect(searchInput.getAttribute("name")).toBe("search");
  });

  it("should display what label", () => {
    render(<SearchField {...mockProps} />);

    expect(screen.getByText("Search for:")).toBeTruthy();
  });
});
