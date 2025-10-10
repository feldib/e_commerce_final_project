import { renderHook, waitFor } from "@testing-library/react";

import { getShoppingCart } from "@/fetching/shopping";
import { Artwork } from "@/fetching/types";

import useShoppingList from "../useShoppingList";

import { getLocalStorageShoppingCart } from "@/helpers/shoppingCartHelpers";

// Mock dependencies
jest.mock("@/fetching/shopping", () => ({
  getShoppingCart: jest.fn(),
}));

jest.mock("@/helpers/shoppingCartHelpers", () => ({
  getLocalStorageShoppingCart: jest.fn(),
}));

const mockGetShoppingCart = getShoppingCart as jest.MockedFunction<
  typeof getShoppingCart
>;
const mockGetLocalStorageShoppingCart =
  getLocalStorageShoppingCart as jest.MockedFunction<
    typeof getLocalStorageShoppingCart
  >;

describe("useShoppingList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch shopping cart from server when logged in", async () => {
    const mockArtworks: Artwork[] = [
      {
        id: 1,
        title: "Artwork 1",
        artist_name: "Artist 1",
        price: 100,
        quantity: 2,
        category_id: 1,
        date_added: "2023-01-01",
        stored_amount: 5,
      },
      {
        id: 2,
        title: "Artwork 2",
        artist_name: "Artist 2",
        price: 200,
        quantity: 1,
        category_id: 2,
        date_added: "2023-01-02",
        stored_amount: 3,
      },
    ];
    mockGetShoppingCart.mockResolvedValue(mockArtworks);

    const { result } = renderHook(() => useShoppingList(true));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockArtworks);
    });

    expect(mockGetShoppingCart).toHaveBeenCalledTimes(1);
    expect(mockGetLocalStorageShoppingCart).not.toHaveBeenCalled();
  });

  it("should fetch shopping cart from localStorage when not logged in", async () => {
    const mockArtworks: Artwork[] = [
      {
        id: 3,
        title: "Local Artwork 1",
        artist_name: "Local Artist",
        price: 150,
        quantity: 1,
        category_id: 1,
        date_added: "2023-01-03",
        stored_amount: 2,
      },
    ];
    mockGetLocalStorageShoppingCart.mockResolvedValue(mockArtworks);

    const { result } = renderHook(() => useShoppingList(false));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockArtworks);
    });

    expect(mockGetLocalStorageShoppingCart).toHaveBeenCalledTimes(1);
    expect(mockGetShoppingCart).not.toHaveBeenCalled();
  });

  it("should handle server error when logged in", async () => {
    mockGetShoppingCart.mockRejectedValue(new Error("Server error"));

    const { result } = renderHook(() => useShoppingList(true));

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });

    expect(mockGetShoppingCart).toHaveBeenCalledTimes(1);
  });

  it("should handle localStorage error when not logged in", async () => {
    mockGetLocalStorageShoppingCart.mockRejectedValue(
      new Error("Storage error")
    );

    const { result } = renderHook(() => useShoppingList(false));

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });

    expect(mockGetLocalStorageShoppingCart).toHaveBeenCalledTimes(1);
  });

  it("should re-fetch data when loggedIn status changes", async () => {
    const serverArtworks: Artwork[] = [
      {
        id: 1,
        title: "Server Art",
        artist_name: "Server Artist",
        price: 100,
        quantity: 1,
        category_id: 1,
        date_added: "2023-01-01",
        stored_amount: 5,
      },
    ];
    const localArtworks: Artwork[] = [
      {
        id: 2,
        title: "Local Art",
        artist_name: "Local Artist",
        price: 200,
        quantity: 2,
        category_id: 2,
        date_added: "2023-01-02",
        stored_amount: 3,
      },
    ];

    mockGetShoppingCart.mockResolvedValue(serverArtworks);
    mockGetLocalStorageShoppingCart.mockResolvedValue(localArtworks);

    const { result, rerender } = renderHook(
      ({ loggedIn }) => useShoppingList(loggedIn),
      { initialProps: { loggedIn: true } }
    );

    await waitFor(() => {
      expect(result.current).toEqual(serverArtworks);
    });

    rerender({ loggedIn: false });

    await waitFor(() => {
      expect(result.current).toEqual(localArtworks);
    });

    expect(mockGetShoppingCart).toHaveBeenCalledTimes(1);
    expect(mockGetLocalStorageShoppingCart).toHaveBeenCalledTimes(1);
  });

  it("should start with empty array", () => {
    const { result } = renderHook(() => useShoppingList(true));

    expect(result.current).toEqual([]);
  });
});
