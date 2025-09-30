"use client";
import React from "react";

import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

import { addToShoppingList } from "@/fetching/fetching";

import { useI18n } from "../providers/I18nProvider";
import SinglePurposeButton from "./SinglePurposeButton";

import { increaseLocalStorageShoppingCartQuantity } from "@/helpers/helpers";

type ShoppingCartButtonProps = {
  artwork_id: number;
  quantity: number;
};

function ShoppingCartButton({ artwork_id, quantity }: ShoppingCartButtonProps) {
  const { t } = useI18n();
  return (
    <SinglePurposeButton
      actionOnLoggedIn={addToShoppingList}
      actionOnNotLoggedIn={() => {
        increaseLocalStorageShoppingCartQuantity(artwork_id, quantity);
      }}
      artwork_id={artwork_id}
      toastSuccessMessage={t("components.buttons.item_added_to_cart")}
      toastErrorMessage={t("components.buttons.out_of_stock")}
      icon={faBasketShopping}
    />
  );
}

export default ShoppingCartButton;
