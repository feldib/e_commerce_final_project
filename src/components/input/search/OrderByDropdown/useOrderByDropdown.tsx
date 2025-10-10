"use client";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { SearchFormikInstance, SearchParams } from "@/fetching/types";

type UseOrderByDropdownProps = {
  formik: SearchFormikInstance;
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>
  ) => void;
};

type UseOrderByDropdownReturn = {
  handleOrderSelect: (e: string | null) => void;
  t: (key: string) => string;
};

function useOrderByDropdown({
  formik,
  triggerSearchWithUpdatedValues,
}: UseOrderByDropdownProps): UseOrderByDropdownReturn {
  const { t } = useI18n();

  const handleOrderSelect = (e: string | null) => {
    formik.setFieldValue("order", e);
    triggerSearchWithUpdatedValues({ order: e as string });
  };

  return {
    handleOrderSelect,
    t,
  };
}

export default useOrderByDropdown;
