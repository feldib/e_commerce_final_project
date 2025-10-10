"use client";

import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

import { addToShoppingList } from "@/fetching/fetching";

import { useI18n } from "../../providers/I18nProvider/I18nProvider";

import { increaseLocalStorageShoppingCartQuantity } from "@/helpers/shoppingCartHelpers";

type UseShoppingCartButtonProps = {
  artwork_id: number;
  quantity: number;
};

type UseShoppingCartButtonReturn = {
  actionOnLoggedIn: (artwork_id: number) => Promise<unknown>;
  actionOnNotLoggedIn: () => void;
  artwork_id: number;
  icon: typeof faBasketShopping;
  toastErrorMessage: string;
  toastSuccessMessage: string;
};

function useShoppingCartButton({
  artwork_id,
  quantity,
}: UseShoppingCartButtonProps): UseShoppingCartButtonReturn {
  const { t } = useI18n();

  const handleNotLoggedInAction = () => {
    increaseLocalStorageShoppingCartQuantity(artwork_id, quantity);
  };

  const actionOnLoggedIn = addToShoppingList;
  const actionOnNotLoggedIn = handleNotLoggedInAction;
  const icon = faBasketShopping;
  const toastErrorMessage = t("common.messages.item_out_of_stock");
  const toastSuccessMessage = t("common.messages.item_added_to_cart");

  return {
    actionOnLoggedIn,
    actionOnNotLoggedIn,
    artwork_id,
    icon,
    toastErrorMessage,
    toastSuccessMessage,
  };
}

export default useShoppingCartButton;
