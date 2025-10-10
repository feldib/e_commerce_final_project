"use client";

import React from "react";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import { Artwork } from "@/fetching/types";

import { createQuantityDecreaseHandler } from "@/helpers/shoppingCartHelpers";
import useQuantity from "@/hooks/useQuantity";

type UseRecommendationCardProps = {
  artwork: Artwork;
};

type UseRecommendationCardReturn = {
  handleQuantityDecrease: () => void;
  loggedIn: boolean;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  t: (key: string) => string;
};

function useRecommendationCard({
  artwork,
}: UseRecommendationCardProps): UseRecommendationCardReturn {
  const { t } = useI18n();
  const { loggedIn } = React.useContext(UserDataContext);

  const { quantity, setQuantity } = useQuantity(
    loggedIn,
    artwork.quantity,
    artwork.id
  );

  const handleQuantityDecrease = createQuantityDecreaseHandler(
    quantity,
    setQuantity
  );

  return {
    handleQuantityDecrease,
    loggedIn,
    quantity,
    setQuantity,
    t,
  };
}

export default useRecommendationCard;
