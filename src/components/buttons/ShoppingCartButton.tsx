import React from "react";

import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

import { addToShoppingList } from "@/fetching/fetching";

import SinglePurposeButton from "./SinglePurposeButton";

import { increaseLocalStorageShoppingCartQuantity } from "@/helpers/helpers";

type ShoppingCartButtonProps = {
  artwork_id: number;
  quantity: number;
};

function ShoppingCartButton({ artwork_id, quantity }: ShoppingCartButtonProps) {
  return (
    <SinglePurposeButton
      actionOnLoggedIn={addToShoppingList}
      actionOnNotLoggedIn={() => {
        increaseLocalStorageShoppingCartQuantity(artwork_id, quantity);
      }}
      artwork_id={artwork_id}
      toastSuccessMessage="Item added to shopping cart"
      toastErrorMessage="Item out of stock"
      icon={faBasketShopping}
    />
  );
}

export default ShoppingCartButton;
