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
    errorToast,
    successToast,
  } = useShoppingCartButton({ artwork_id, quantity });

  return (
    <SinglePurposeButton
      actionOnLoggedIn={actionOnLoggedIn}
      actionOnNotLoggedIn={actionOnNotLoggedIn}
      artwork_id={artwork_id}
      errorToast={errorToast}
      icon={icon}
      successToast={successToast}
    />
  );
}

export default ShoppingCartButton;
