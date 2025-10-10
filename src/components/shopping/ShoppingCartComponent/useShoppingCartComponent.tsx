"use client";

import React from "react";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import { Artwork } from "@/fetching/types";

import useShoppingList from "@/hooks/useShoppingList";

type UseShoppingCartComponentReturn = {
  loggedIn: boolean;
  shoppingListItems: Artwork[];
  totalCost: number;
  handleCostsChange: (key: number, newCost: number) => void;
  handleCheckoutClick: () => void;
  t: (key: string) => string;
};

function useShoppingCartComponent(): UseShoppingCartComponentReturn {
  const { loggedIn } = React.useContext(UserDataContext);
  const shoppingListItems = useShoppingList(loggedIn);
  const [costs, setCosts] = React.useState<{ [key: number]: number }>({});
  const [totalCost, setTotalCost] = React.useState(0);
  const { t } = useI18n();

  const handleCostsChange = (key: number, newCost: number) => {
    const temp = costs;
    temp[key] = newCost;
    setCosts(temp);
    setTotalCost(Object.values(costs).reduce((acc, curr) => acc + curr, 0));
  };

  const handleCheckoutClick = () => {
    localStorage.removeItem("currentOrder");
    localStorage.setItem(
      "currentOrder",
      JSON.stringify({ items: shoppingListItems, totalCost })
    );
  };

  return {
    loggedIn,
    shoppingListItems,
    totalCost,
    handleCostsChange,
    handleCheckoutClick,
    t,
  };
}

export default useShoppingCartComponent;
