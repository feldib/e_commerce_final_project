import { act, renderHook } from "@testing-library/react";

import useQuantity from "../useQuantity";

import * as shoppingCartHelpers from "@/helpers/shoppingCartHelpers";

// Mock shopping cart helpers
jest.mock("@/helpers/shoppingCartHelpers", () => ({
  getShoppingCartFromLocalStorage: jest.fn(),
}));

const mockGetShoppingCartFromLocalStorage =
  shoppingCartHelpers.getShoppingCartFromLocalStorage as jest.MockedFunction<
    typeof shoppingCartHelpers.getShoppingCartFromLocalStorage
  >;

describe("useQuantity", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with inStock quantity when logged in", () => {
    const { result } = renderHook(() => useQuantity(true, 10, 1));

    expect(result.current.quantity).toBe(10);
    expect(typeof result.current.setQuantity).toBe("function");
  });

  it("should calculate quantity from localStorage when not logged in and item in cart", () => {
    mockGetShoppingCartFromLocalStorage.mockReturnValue([
      { artwork_id: 1, quantity: 3 },
    ]);

    const { result } = renderHook(() => useQuantity(false, 10, 1));

    expect(result.current.quantity).toBe(7); // 10 - 3
  });

  it("should return full stock when not logged in and item not in cart", () => {
    mockGetShoppingCartFromLocalStorage.mockReturnValue([
      { artwork_id: 2, quantity: 3 }, // Different artwork
    ]);

    const { result } = renderHook(() => useQuantity(false, 10, 1));

    expect(result.current.quantity).toBe(10);
  });

  it("should return full stock when not logged in and cart is empty", () => {
    mockGetShoppingCartFromLocalStorage.mockReturnValue([]);

    const { result } = renderHook(() => useQuantity(false, 10, 1));

    expect(result.current.quantity).toBe(10);
  });

  it("should allow updating quantity", () => {
    const { result } = renderHook(() => useQuantity(true, 10, 1));

    act(() => {
      result.current.setQuantity(5);
    });

    expect(result.current.quantity).toBe(5);
  });
});
