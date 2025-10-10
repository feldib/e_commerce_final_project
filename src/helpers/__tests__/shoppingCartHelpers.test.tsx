import { ShoppingCartItem } from "@/fetching/types";

import {
  createQuantityDecreaseHandler,
  decreaseLocalStorageShoppingCartQuantity,
  increaseLocalStorageShoppingCartQuantity,
  removeLocalStorageShoppingCartQuantity,
} from "../shoppingCartHelpers";

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock constants
jest.mock("@/utils/constants", () => ({
  STORAGE_KEYS: {
    SHOPPING_CART: "shopping_cart",
  },
  SERVER_URL: "http://localhost:3001/",
}));

describe("shoppingCartHelpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createQuantityDecreaseHandler", () => {
    it("should return a function", () => {
      const mockSetQuantity = jest.fn();
      const handler = createQuantityDecreaseHandler(5, mockSetQuantity);

      expect(typeof handler).toBe("function");
    });

    it("should decrease quantity when quantity is greater than 0", () => {
      const mockSetQuantity = jest.fn();
      const handler = createQuantityDecreaseHandler(5, mockSetQuantity);

      handler();

      expect(mockSetQuantity).toHaveBeenCalledWith(4);
    });

    it("should not decrease quantity when quantity is 0", () => {
      const mockSetQuantity = jest.fn();
      const handler = createQuantityDecreaseHandler(0, mockSetQuantity);

      handler();

      expect(mockSetQuantity).not.toHaveBeenCalled();
    });

    it("should not decrease quantity when quantity is negative", () => {
      const mockSetQuantity = jest.fn();
      const handler = createQuantityDecreaseHandler(-1, mockSetQuantity);

      handler();

      expect(mockSetQuantity).not.toHaveBeenCalled();
    });

    it("should decrease from 1 to 0", () => {
      const mockSetQuantity = jest.fn();
      const handler = createQuantityDecreaseHandler(1, mockSetQuantity);

      handler();

      expect(mockSetQuantity).toHaveBeenCalledWith(0);
    });
  });

  describe("increaseLocalStorageShoppingCartQuantity", () => {
    it("should throw error when stored_amount is 0", () => {
      expect(() => {
        increaseLocalStorageShoppingCartQuantity(1, 0);
      }).toThrow("Item is out of stock");
    });

    it("should throw error when stored_amount is negative", () => {
      expect(() => {
        increaseLocalStorageShoppingCartQuantity(1, -1);
      }).toThrow("Item is out of stock");
    });

    it("should add new item to empty cart", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      increaseLocalStorageShoppingCartQuantity(1, 5);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "shopping_cart",
        JSON.stringify([{ artwork_id: 1, quantity: 1 }])
      );
    });

    it("should increase quantity of existing item", () => {
      const existingCart = [{ artwork_id: 1, quantity: 2 }];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingCart));

      increaseLocalStorageShoppingCartQuantity(1, 5);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "shopping_cart",
        JSON.stringify([{ artwork_id: 1, quantity: 3 }])
      );
    });
  });

  describe("decreaseLocalStorageShoppingCartQuantity", () => {
    it("should decrease quantity of existing item", () => {
      const existingCart = [{ artwork_id: 1, quantity: 3 }];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingCart));

      decreaseLocalStorageShoppingCartQuantity(1);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "shopping_cart",
        JSON.stringify([{ artwork_id: 1, quantity: 2 }])
      );
    });

    it("should remove item when quantity becomes 0", () => {
      const existingCart = [{ artwork_id: 1, quantity: 1 }];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingCart));

      decreaseLocalStorageShoppingCartQuantity(1);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "shopping_cart",
        JSON.stringify([])
      );
    });

    it("should do nothing when item does not exist", () => {
      const existingCart: ShoppingCartItem[] = [];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingCart));

      decreaseLocalStorageShoppingCartQuantity(1);

      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe("removeLocalStorageShoppingCartQuantity", () => {
    it("should remove item from cart", () => {
      const existingCart = [
        { artwork_id: 1, quantity: 3 },
        { artwork_id: 2, quantity: 1 },
      ];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingCart));

      removeLocalStorageShoppingCartQuantity(1);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "shopping_cart",
        JSON.stringify([{ artwork_id: 2, quantity: 1 }])
      );
    });

    it("should do nothing when item does not exist", () => {
      const existingCart = [{ artwork_id: 2, quantity: 1 }];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingCart));

      removeLocalStorageShoppingCartQuantity(1);

      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });

    it("should remove single item from cart completely", () => {
      const existingCart = [{ artwork_id: 1, quantity: 5 }];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingCart));

      removeLocalStorageShoppingCartQuantity(1);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "shopping_cart",
        JSON.stringify([])
      );
    });
  });
});
