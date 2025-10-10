"use client";
import React from "react";

import SinglePurposeButton from "../SinglePurposeButton/SinglePurposeButton";
import useShoppingCartButton from "./useShoppingCartButton";

type ShoppingCartButtonProps = {
  artwork_id: number;
  quantity: number;
};

function ShoppingCartButton({ artwork_id, quantity }: ShoppingCartButtonProps) {
  const {
    actionOnLoggedIn,
    actionOnNotLoggedIn,
    icon,
    toastErrorMessage,
    toastSuccessMessage,
  } = useShoppingCartButton({ artwork_id, quantity });

  return (
    <SinglePurposeButton
      actionOnLoggedIn={actionOnLoggedIn}
      actionOnNotLoggedIn={actionOnNotLoggedIn}
      artwork_id={artwork_id}
      icon={icon}
      toastErrorMessage={toastErrorMessage}
      toastSuccessMessage={toastSuccessMessage}
    />
  );
}

export default ShoppingCartButton;
