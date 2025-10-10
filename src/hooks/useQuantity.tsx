"use client";
import React from "react";

import { ShoppingCartItem } from "@/fetching/types";

import { getShoppingCartFromLocalStorage } from "@/helpers/shoppingCartHelpers";

const calculateQuantityFromCart = (
  signedOutShoppingCart: ShoppingCartItem[],
  artworkId: number,
  inStock: number
): number => {
  if (signedOutShoppingCart.length) {
    const index = signedOutShoppingCart.findIndex((item: ShoppingCartItem) => {
      return item.artwork_id === artworkId;
    });

    if (index !== -1) {
      return inStock - signedOutShoppingCart[index].quantity;
    }
  }
  return inStock;
};

const useQuantity = (loggedIn: boolean, inStock: number, artworkId: number) => {
  const [quantity, setQuantity] = React.useState(inStock);
  React.useEffect(() => {
    if (!loggedIn) {
      const signedOutShoppingCart = getShoppingCartFromLocalStorage();
      const calculatedQuantity = calculateQuantityFromCart(
        signedOutShoppingCart,
        artworkId,
        inStock
      );
      setQuantity(calculatedQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { quantity, setQuantity };
};

export default useQuantity;
