"use client";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { Category, SearchFormikInstance, SearchParams } from "@/fetching/types";

import { useCategories } from "@/hooks/useCategories";

type UseQueriesProps = {
  formik: SearchFormikInstance;
  categories: Category[];
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>
  ) => void;
  searchedValues?: SearchParams;
};

type UseQueriesReturn = {
  getCurrentCategoryName: (categoryId: string) => string;
  handleRemoveBetween: () => void;
  handleRemoveMin: () => void;
  handleRemoveMax: () => void;
  handleRemoveTitle: () => void;
  handleRemoveArtist: () => void;
  handleRemoveCategory: () => void;
};

function useQueries({
  formik,
  categories,
  triggerSearchWithUpdatedValues,
}: UseQueriesProps): UseQueriesReturn {
  const { locale } = useI18n();
  const { getCategoryName } = useCategories(locale);

  const getCurrentCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => {
      return cat.id === parseInt(categoryId);
    });
    return category ? getCategoryName(category) : "Unknown Category";
  };

  const handleRemoveBetween = () => {
    formik.setFieldValue("max", 0);
    formik.setFieldValue("min", 0);
    triggerSearchWithUpdatedValues({ max: 0, min: 0 });
  };

  const handleRemoveMin = () => {
    formik.setFieldValue("min", 0);
    triggerSearchWithUpdatedValues({ min: 0 });
  };

  const handleRemoveMax = () => {
    formik.setFieldValue("max", 0);
    triggerSearchWithUpdatedValues({ max: 0 });
  };

  const handleRemoveTitle = () => {
    formik.setFieldValue("title", "");
    triggerSearchWithUpdatedValues({ title: "" });
  };

  const handleRemoveArtist = () => {
    formik.setFieldValue("artist_name", "");
    triggerSearchWithUpdatedValues({ artist_name: "" });
  };

  const handleRemoveCategory = () => {
    formik.setFieldValue("category_id", "");
    triggerSearchWithUpdatedValues({ category_id: "" });
  };

  return {
    getCurrentCategoryName,
    handleRemoveBetween,
    handleRemoveMin,
    handleRemoveMax,
    handleRemoveTitle,
    handleRemoveArtist,
    handleRemoveCategory,
  };
}

export default useQueries;
