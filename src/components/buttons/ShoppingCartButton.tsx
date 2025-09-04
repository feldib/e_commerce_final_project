import React from "react";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import SinglePurposeButton from "./SinglePurposeButton";
import { increaseLocalStorageShoppingCartQuantity } from "../../helpers/helpers";
import { addToShoppingList } from "@/fetching/fetching";

type ShoppingCartButtonProps = {
  artwork_id: number;
  quantity: number;
};

function ShoppingCartButton(props: ShoppingCartButtonProps) {
  return (
    <SinglePurposeButton
      actionOnLoggedIn={addToShoppingList}
      actionOnNotLoggedIn={() => {
        increaseLocalStorageShoppingCartQuantity(
          props.artwork_id,
          props.quantity,
        );
      }}
      artwork_id={props.artwork_id}
      toastSuccessMessage="Item added to shopping cart"
      toastErrorMessage="Item out of stock"
      icon={faBasketShopping}
    />
  );
}

export default ShoppingCartButton;
