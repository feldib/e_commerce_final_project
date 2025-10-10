"use client";

import { useI18n } from "@/components/providers/I18nProvider";

import { Category, SearchFormikInstance, SearchParams } from "@/fetching/types";

type UseArtworkSearchFieldsProps = {
  formik: SearchFormikInstance;
  categories: Category[];
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>
  ) => void;
  searchedValues?: SearchParams;
};

type UseArtworkSearchFieldsReturn = {
  t: (key: string) => string;
  handleOnlyFeaturedChange: () => void;
  handleSearchClick: () => void;
  handleCategoryChange: (value: string | number) => void;
};

function useArtworkSearchFields({
  formik,
  triggerSearchWithUpdatedValues,
}: UseArtworkSearchFieldsProps): UseArtworkSearchFieldsReturn {
  const { t } = useI18n();

  const handleOnlyFeaturedChange = () => {
    const newValue = !formik.values.only_featured;
    formik.setFieldValue("only_featured", newValue);
    triggerSearchWithUpdatedValues({ only_featured: newValue });
  };

  const handleSearchClick = () => {
    triggerSearchWithUpdatedValues({});
  };

  const handleCategoryChange = (value: string | number) => {
    formik.setFieldValue("category_id", value);
    triggerSearchWithUpdatedValues({ category_id: value.toString() });
  };

  return {
    t,
    handleOnlyFeaturedChange,
    handleSearchClick,
    handleCategoryChange,
  };
}

export default useArtworkSearchFields;
