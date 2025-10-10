"use client";

import React from "react";

import { useI18n } from "@/components/providers/I18nProvider";

import { SearchFormikInstance } from "@/fetching/types";

type UsePriceRangeInputProps = {
  formik: SearchFormikInstance;
};

type UsePriceRangeInputReturn = {
  t: (key: string) => string;
  handleMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function usePriceRangeInput({
  formik,
}: UsePriceRangeInputProps): UsePriceRangeInputReturn {
  const { t } = useI18n();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);
    formik.setFieldValue("min", value);
  };

  const handleMinBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);
    if (formik.values.min < 0) {
      formik.setFieldValue("min", 0);
    }
    const max = formik.values.max;
    if (max > 0 && max <= formik.values.min) {
      formik.setFieldValue("max", 0);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);
    formik.setFieldValue("max", value);
  };

  const handleMaxBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);
    const min = formik.values.min;
    const max = formik.values.max;
    if (min > 0 && max > 0 && min > max) {
      formik.setFieldValue("max", 0);
    }
  };

  return {
    t,
    handleMinChange,
    handleMinBlur,
    handleMaxChange,
    handleMaxBlur,
  };
}

export default usePriceRangeInput;
