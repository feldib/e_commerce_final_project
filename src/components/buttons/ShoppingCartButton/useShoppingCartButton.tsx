"use client";

import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { Id } from "react-toastify/unstyled";

import { cartToast } from "@/utils/toastUtils";

import { addToShoppingList } from "@/fetching/shopping";

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
  errorToast: (t: (key: string) => string) => Id;
  successToast: (t: (key: string) => string) => Id;
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
  const errorToast = cartToast.itemOutOfStock;
  const successToast = cartToast.itemAdded;

  return {
    actionOnLoggedIn,
    actionOnNotLoggedIn,
    artwork_id,
    icon,
    errorToast,
    successToast,
  };
}

export default useShoppingCartButton;
