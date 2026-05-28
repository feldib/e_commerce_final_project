"use client";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Id } from "react-toastify/unstyled";

import { uiToast } from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import {
  addToWishlisted,
  isWishlisted,
  removeFromWishlisted,
} from "@/fetching/shopping";

type UseFavouriteButtonProps = {
  artwork_id: number;
};

type UseFavouriteButtonReturn = {
  addToAdded: (artwork_id: number) => Promise<void>;
  artwork_id: number;
  filledButton: React.ReactNode;
  isAdded: (artwork_id: number) => Promise<boolean>;
  regularButton: React.ReactNode;
  removeFromAdded: (artwork_id: number) => Promise<void>;
  warningToast: (t: (key: string) => string) => Id;
};

function useFavouriteButton({
  artwork_id,
}: UseFavouriteButtonProps): UseFavouriteButtonReturn {
  const { t } = useI18n();

  const addToAdded = addToWishlisted;
  const isAdded = isWishlisted;
  const regularButton = <FontAwesomeIcon icon={faHeartRegular} />;
  const removeFromAdded = removeFromWishlisted;
  const filledButton = <FontAwesomeIcon icon={faHeartSolid} />;
  const warningToast = uiToast.signInToAddWishlist;

  return {
    addToAdded,
    artwork_id,
    filledButton,
    isAdded,
    regularButton,
    removeFromAdded,
    warningToast,
  };
}

export default useFavouriteButton;
