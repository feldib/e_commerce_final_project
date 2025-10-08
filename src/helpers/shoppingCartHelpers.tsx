import axiosConfigured from "@/utils/axiosConfigured";
import { SERVER_URL, STORAGE_KEYS } from "@/utils/constants";

import {
  getDataOfArtworks,
  replaceSavedShoppingCart,
} from "@/fetching/fetching";
import { Artwork, ShoppingCartItem } from "@/fetching/types";

const getCartItems = (): ShoppingCartItem[] => {
  const shoppingCartString = localStorage.getItem(STORAGE_KEYS.SHOPPING_CART);
  try {
    return shoppingCartString ? JSON.parse(shoppingCartString) : [];
  } catch {
    return [];
  }
};

const saveCartItems = (items: ShoppingCartItem[]): void => {
  localStorage.setItem(STORAGE_KEYS.SHOPPING_CART, JSON.stringify(items));
};

const clearCart = (): void => {
  localStorage.removeItem(STORAGE_KEYS.SHOPPING_CART);
};

const findCartItemIndex = (
  items: ShoppingCartItem[],
  artworkId: number
): number => {
  return items.findIndex((item) => item.artwork_id === artworkId);
};

const increaseLocalStorageShoppingCartQuantity = (
  artwork_id: number,
  stored_amount: number
) => {
  if (stored_amount <= 0) {
    throw new Error("Item is out of stock");
  }

  const shoppingCart = getCartItems();
  const existingRecordIndex = findCartItemIndex(shoppingCart, artwork_id);

  if (existingRecordIndex < 0) {
    shoppingCart.push({
      artwork_id: artwork_id,
      quantity: 1,
    });
  } else if (shoppingCart[existingRecordIndex].quantity > 0) {
    shoppingCart[existingRecordIndex].quantity++;
  } else {
    throw new Error("Item is out of stock");
  }

  saveCartItems(shoppingCart);
};

const decreaseLocalStorageShoppingCartQuantity = (artwork_id: number) => {
  const shoppingCart = getCartItems();
  const existingRecordIndex = findCartItemIndex(shoppingCart, artwork_id);

  if (
    existingRecordIndex >= 0 &&
    shoppingCart[existingRecordIndex].quantity > 0
  ) {
    if (shoppingCart[existingRecordIndex].quantity === 1) {
      shoppingCart.splice(existingRecordIndex, 1);
    } else {
      shoppingCart[existingRecordIndex].quantity--;
    }

    saveCartItems(shoppingCart);
  }
};

const removeLocalStorageShoppingCartQuantity = (artwork_id: number) => {
  const shoppingCart = getCartItems();
  const existingRecordIndex = findCartItemIndex(shoppingCart, artwork_id);

  if (
    existingRecordIndex >= 0 &&
    shoppingCart[existingRecordIndex].quantity > 0
  ) {
    shoppingCart.splice(existingRecordIndex, 1);
    saveCartItems(shoppingCart);
  }
};

const getLocalStorageShoppingCart = async (): Promise<Artwork[]> => {
  const shoppingCart = getCartItems();
  if (!shoppingCart.length) {
    return [];
  } else {
    try {
      const data = await getDataOfArtworks(shoppingCart);
      return data;
    } catch (error) {
      console.error("Failed to fetch shopping cart data:", error);
      return [];
    }
  }
};

const replacePreviousShoppingCart = async () => {
  try {
    const shopping_cart = getCartItems();
    await replaceSavedShoppingCart(shopping_cart);
    clearCart();
  } catch (error) {
    console.error("Failed to replace shopping cart:", error);
  }
};

const checkIfShoppingCartIsEmpty = async (
  loggedIn: boolean
): Promise<boolean> => {
  try {
    if (loggedIn) {
      // Check server-side cart
      const results = await axiosConfigured.get(
        `${SERVER_URL}/users/shopping_cart`
      );
      return Array.isArray(results.data) && results.data.length > 0;
    } else {
      // Check client-side cart
      const artworks = await getLocalStorageShoppingCart();
      return artworks.length > 0;
    }
  } catch (error) {
    console.error("Error checking shopping cart:", error);
    return false;
  }
};

function getShoppingCartFromLocalStorage(): ShoppingCartItem[] {
  return getCartItems();
}

export {
  checkIfShoppingCartIsEmpty,
  decreaseLocalStorageShoppingCartQuantity,
  getLocalStorageShoppingCart,
  getShoppingCartFromLocalStorage,
  increaseLocalStorageShoppingCartQuantity,
  removeLocalStorageShoppingCartQuantity,
  replacePreviousShoppingCart,
};
