import React from "react";
import { render, screen } from "@testing-library/react";

import ShoppingCartButton from "../ShoppingCartButton";

// Mock hooks
jest.mock("../useShoppingCartButton", () => ({
  __esModule: true,
  default: () => ({
    handleAddOrRemoveFromShoppingCart: jest.fn(),
    isInShoppingCart: false,
    itemQuantity: 0,
  }),
}));

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe("ShoppingCartButton", () => {
  const mockProps = {
    artwork_id: 123,
    quantity: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<ShoppingCartButton {...mockProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should render button element", () => {
    render(<ShoppingCartButton {...mockProps} />);

    const button = screen.getByRole("button");
    expect(button).toBeTruthy();
  });

  it("should handle different quantities", () => {
    const differentProps = { artwork_id: 456, quantity: 3 };

    render(<ShoppingCartButton {...differentProps} />);

    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("should handle zero quantity", () => {
    const zeroQuantityProps = { artwork_id: 789, quantity: 0 };

    render(<ShoppingCartButton {...zeroQuantityProps} />);

    expect(screen.getByRole("button")).toBeTruthy();
  });
});
