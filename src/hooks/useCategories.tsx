import { Category } from "@/fetching/types";

import useAxios from "./useAxios";

export const useCategories = (locale: string) => {
  const categories = useAxios("/categories") as Category[];

  const getCategoryName = (category: Category): string => {
    switch (locale) {
      case "he":
        return category.cname_he || category.cname_en;
      case "hu":
        return category.cname_hu || category.cname_en;
      case "en":
      default:
        return category.cname_en;
    }
  };

  const getCategoryNameById = (categoryId: number): string => {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? getCategoryName(category) : "";
  };

  return {
    categories,
    getCategoryName,
    getCategoryNameById,
  };
};
