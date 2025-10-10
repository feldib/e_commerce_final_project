"use client";

import React from "react";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { createQuantityDecreaseHandler } from "@/helpers/shoppingCartHelpers";
import { useCategories } from "@/hooks/useCategories";

type UseArtworkDescriptionCardProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

type UseArtworkDescriptionCardReturn = {
  getCategoryNameById: (categoryId: number) => string;
  handleQuantityDecrease: () => void;
  locale: string;
  t: (key: string) => string;
};

function useArtworkDescriptionCard({
  quantity,
  setQuantity,
}: UseArtworkDescriptionCardProps): UseArtworkDescriptionCardReturn {
  const { t, locale } = useI18n();
  const { getCategoryNameById } = useCategories(locale);

  const handleQuantityDecrease = createQuantityDecreaseHandler(
    quantity,
    setQuantity
  );

  return {
    getCategoryNameById,
    handleQuantityDecrease,
    locale,
    t,
  };
}

export default useArtworkDescriptionCard;
