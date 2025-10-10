"use client";

import React from "react";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { createQuantityDecreaseHandler } from "@/helpers/shoppingCartHelpers";

type UseArtworkInfoCardProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

type UseArtworkInfoCardReturn = {
  handleQuantityDecrease: () => void;
  t: (key: string) => string;
};

function useArtworkInfoCard({
  quantity,
  setQuantity,
}: UseArtworkInfoCardProps): UseArtworkInfoCardReturn {
  const { t } = useI18n();

  const handleQuantityDecrease = createQuantityDecreaseHandler(
    quantity,
    setQuantity
  );

  return {
    handleQuantityDecrease,
    t,
  };
}

export default useArtworkInfoCard;
