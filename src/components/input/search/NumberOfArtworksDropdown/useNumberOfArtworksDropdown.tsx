"use client";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { SearchFormikInstance, SearchParams } from "@/fetching/types";

type UseNumberOfArtworksDropdownProps = {
  formik: SearchFormikInstance;
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>
  ) => void;
};

type UseNumberOfArtworksDropdownReturn = {
  handleNumberOfArtworksSelect: (e: string | null) => void;
  t: (key: string) => string;
};

function useNumberOfArtworksDropdown({
  formik,
  triggerSearchWithUpdatedValues,
}: UseNumberOfArtworksDropdownProps): UseNumberOfArtworksDropdownReturn {
  const { t } = useI18n();

  const handleNumberOfArtworksSelect = (e: string | null) => {
    formik.setFieldValue("n", Number(e));
    triggerSearchWithUpdatedValues({ n: Number(e) });
  };

  return {
    handleNumberOfArtworksSelect,
    t,
  };
}

export default useNumberOfArtworksDropdown;
