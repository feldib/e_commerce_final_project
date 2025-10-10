import { useCallback } from "react";

import { Category } from "@/fetching/types";

import useAxios from "./useAxios";

export const useCategories = (locale: string) => {
  const categories = useAxios("/categories") as Category[];

  const getCategoryName = useCallback(
    (category: Category): string => {
      if (!category?.translations) {
        return "";
      }

      if (category.translations[locale]) {
        return category.translations[locale];
      }

      if (category.translations.en) {
        return category.translations.en;
      }

      const availableTranslations = Object.values(category.translations);
      return availableTranslations.length > 0 ? availableTranslations[0] : "";
    },
    [locale]
  );

  const getCategoryNameById = useCallback(
    (categoryId: number): string => {
      const category = categories?.find((cat) => cat.id === categoryId);
      return category ? getCategoryName(category) : "";
    },
    [categories, getCategoryName]
  );

  return {
    categories,
    getCategoryName,
    getCategoryNameById,
  };
};
