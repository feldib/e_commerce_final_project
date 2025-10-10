import axiosConfigured from "@/utils/axiosConfigured";
import { SERVER_URL, USERS_URL } from "@/utils/constants";

import { Artwork } from "./types";

// ===================
// Shopping Cart / Wishlist
// ===================

export const getShoppingCart = async (): Promise<Artwork[]> => {
  const res = await axiosConfigured.get(
    `${SERVER_URL}/${USERS_URL}/shopping_cart`
  );
  return res.data as Artwork[];
};

export const addToShoppingList = async (artwork_id: number): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/${USERS_URL}/shopping_cart`, {
    artwork_id,
  });
  // returns void
};

export const removeFromShoppingList = async (
  artwork_id: number
): Promise<void> => {
  await axiosConfigured.delete(
    `${SERVER_URL}/${USERS_URL}/shopping_cart/${artwork_id}`
  );
  // returns void
};

export const increaseShoppingListItemQuantity = async (
  artwork_id: number
): Promise<void> => {
  await axiosConfigured.put(`${SERVER_URL}/${USERS_URL}/shopping_cart`, {
    action: "increase",
    artwork_id,
  });
  // returns void
};

export const decreaseShoppingListItemQuantity = async (
  artwork_id: number
): Promise<void> => {
  await axiosConfigured.put(`${SERVER_URL}/${USERS_URL}/shopping_cart`, {
    action: "decrease",
    artwork_id,
  });
  // returns void
};

export const replaceSavedShoppingCart = async (
  shopping_cart: { artwork_id: number; quantity: number }[]
): Promise<void> => {
  await axiosConfigured.put(`${SERVER_URL}/${USERS_URL}/shopping_cart`, {
    action: "replace",
    shopping_cart,
  });
  // returns void
};

export const addToWishlisted = async (artwork_id: number): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/${USERS_URL}/wishlist`, {
    artwork_id,
  });
  // returns void
};

export const removeFromWishlisted = async (
  artwork_id: number
): Promise<void> => {
  await axiosConfigured.delete(
    `${SERVER_URL}/${USERS_URL}/wishlist/${artwork_id}`
  );
  // returns void
};

export const isWishlisted = async (artwork_id: number): Promise<boolean> => {
  const result = await axiosConfigured.get(
    `${SERVER_URL}/${USERS_URL}/wishlist/${artwork_id}`
  );
  return result.data as boolean;
};
