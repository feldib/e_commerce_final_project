"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { cartToast } from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import { User } from "@/fetching/types";

import { checkIfShoppingCartIsEmpty } from "@/helpers/shoppingCartHelpers";

type UseHeaderReturn = {
  t: (key: string) => string;
  user: User;
  loggedIn: boolean;
  expanded: boolean;
  closeExpandedNav: () => void;
  handleShoppingCartClick: () => Promise<void>;
  handleToggleClick: () => void;
  handleNavClose: () => void;
};

function useHeader(): UseHeaderReturn {
  const router = useRouter();
  const { t } = useI18n();
  const { user, loggedIn } = React.useContext(UserDataContext);
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const closeExpandedNav = () => {
    setExpanded(false);
  };

  const handleShoppingCartClick = async () => {
    const isShoppingCartEmpty = await checkIfShoppingCartIsEmpty(loggedIn);

    if (!isShoppingCartEmpty) {
      cartToast.cartEmptyWarning(t);
    } else {
      router.push("/shopping_cart");
    }
  };

  const handleToggleClick = () => {
    toggleExpanded();
  };

  const handleNavClose = () => {
    closeExpandedNav();
  };

  return {
    t,
    user,
    loggedIn,
    expanded,
    closeExpandedNav,
    handleShoppingCartClick,
    handleToggleClick,
    handleNavClose,
  };
}

export default useHeader;
