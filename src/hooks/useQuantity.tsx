"use client";
import React from "react";

import { ShoppingCartItem } from "@/fetching/types";

import { getShoppingCartFromLocalStorage } from "@/helpers/helpers";

const useQuantity = (loggedIn: boolean, inStock: number, artworkId: number) => {
  const [quantity, setQuantity] = React.useState(inStock);
  React.useEffect(() => {
    if (!loggedIn) {
      const signedOutShoppingCart = getShoppingCartFromLocalStorage();
      if (signedOutShoppingCart.length) {
        const index = signedOutShoppingCart.findIndex(
          (item: ShoppingCartItem) => {
            return item.artwork_id === artworkId;
          }
        );

        if (index !== -1) {
          setQuantity(inStock - signedOutShoppingCart[index].quantity);
        }
      }
      console.log(
        "signedOutShoppingCart",
        JSON.stringify(signedOutShoppingCart)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { quantity, setQuantity };
};

export default useQuantity;
