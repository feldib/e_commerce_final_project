"use client";

import React from "react";

import {
  showCartItemAddedToast,
  showCartItemOutOfStockToast,
} from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import {
  decreaseShoppingListItemQuantity,
  increaseShoppingListItemQuantity,
  removeFromShoppingList,
} from "@/fetching/fetching";
import { Artwork } from "@/fetching/types";

import {
  decreaseLocalStorageShoppingCartQuantity,
  increaseLocalStorageShoppingCartQuantity,
  removeLocalStorageShoppingCartQuantity,
} from "@/helpers/shoppingCartHelpers";
import { useCategories } from "@/hooks/useCategories";

type UseShoppingCartDataLinesProps = {
  line: Artwork;
  index: number;
  changeCosts: (index: number, cost: number) => void;
};

type UseShoppingCartDataLinesReturn = {
  loggedIn: boolean;
  getCategoryNameById: (id: number) => string;
  quantity: number;
  handleDecrease: () => Promise<void>;
  handleIncrease: () => Promise<void>;
  handleRemove: () => Promise<void>;
  t: (key: string) => string;
};

function useShoppingCartDataLines({
  line,
  index,
  changeCosts,
}: UseShoppingCartDataLinesProps): UseShoppingCartDataLinesReturn {
  const { t, locale } = useI18n();
  const { getCategoryNameById } = useCategories(locale);
  const { loggedIn } = React.useContext(UserDataContext);

  const [quantity, setQuantity] = React.useState(line.quantity);

  React.useEffect(() => {
    changeCosts(index, line.price * quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const handleDecrease = async () => {
    if (loggedIn) {
      await decreaseShoppingListItemQuantity(line.id);
    } else {
      decreaseLocalStorageShoppingCartQuantity(line.id);
    }

    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = async () => {
    if (loggedIn) {
      try {
        await increaseShoppingListItemQuantity(line.id);
        showCartItemAddedToast(t);
        setQuantity(quantity + 1);
      } catch {
        showCartItemOutOfStockToast(t);
      }
    } else {
      try {
        increaseLocalStorageShoppingCartQuantity(
          line.id,
          line.stored_amount - quantity
        );
        showCartItemAddedToast(t);
        setQuantity(quantity + 1);
      } catch {
        showCartItemOutOfStockToast(t);
      }
    }
  };

  const handleRemove = async () => {
    if (loggedIn) {
      await removeFromShoppingList(line.id);
      setQuantity(0);
    } else {
      removeLocalStorageShoppingCartQuantity(line.id);
      setQuantity(0);
    }
  };

  return {
    loggedIn,
    getCategoryNameById,
    quantity,
    handleDecrease,
    handleIncrease,
    handleRemove,
    t,
  };
}

export default useShoppingCartDataLines;
