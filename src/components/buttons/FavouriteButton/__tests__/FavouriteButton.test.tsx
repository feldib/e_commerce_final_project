import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import FavouriteButton from "../FavouriteButton";

// Mock hooks
jest.mock("../useFavouriteButton", () => ({
  __esModule: true,
  default: () => ({
    handleAddOrRemoveFromWishList: jest.fn(),
    isOnWishList: false,
  }),
}));

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe("FavouriteButton", () => {
  const mockProps = {
    artwork_id: 123,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<FavouriteButton {...mockProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should render button element", () => {
    render(<FavouriteButton {...mockProps} />);

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();
  });

  it("should be clickable", () => {
    render(<FavouriteButton {...mockProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Should not crash when clicked
    expect(button).toBeTruthy();
  });

  it("should handle different artwork IDs", () => {
    const differentProps = { artwork_id: 456 };

    render(<FavouriteButton {...differentProps} />);

    expect(screen.getByRole("button")).toBeTruthy();
  });
});
