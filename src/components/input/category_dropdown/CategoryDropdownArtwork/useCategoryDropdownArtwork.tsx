"use client";

import React from "react";

import { Dropdown } from "react-bootstrap";
import { FormikProps } from "formik";

import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { Category } from "@/fetching/types";

import { useCategories } from "@/hooks/useCategories";

type UseCategoryDropdownArtworkProps<T extends Record<string, unknown>> = {
  categories: Category[];
  formik: FormikProps<T>;
  fieldName: string;
  onCategoryChange?: (category: Category) => Promise<void> | void;
};

type UseCategoryDropdownArtworkReturn = {
  chosenCategory: Category | null;
  cats: React.JSX.Element;
  showError: boolean;
  formikError: string;
  handleCategoryClick: (category: Category) => Promise<void>;
  getCategoryName: (category: Category) => string;
  t: (key: string) => string;
};

function useCategoryDropdownArtwork<T extends Record<string, unknown>>({
  categories,
  formik,
  fieldName,
  onCategoryChange,
}: UseCategoryDropdownArtworkProps<T>): UseCategoryDropdownArtworkReturn {
  const { t, locale } = useI18n();
  const { getCategoryName } = useCategories(locale);

  const [chosenCategory, setChosenCategory] = React.useState<Category | null>(
    formik && formik.values[fieldName]
      ? categories?.find(
          (cat) => cat.id === Number(formik.values[fieldName])
        ) || null
      : null
  );

  React.useEffect(() => {
    if (formik && formik.values[fieldName] && categories) {
      const category = categories.find(
        (cat) => cat.id === Number(formik.values[fieldName])
      );
      if (category && (!chosenCategory || category.id !== chosenCategory.id)) {
        setChosenCategory(category);
      }
    }
  }, [formik, fieldName, categories, chosenCategory]);

  const [cats, setCats] = React.useState<React.JSX.Element>(<LoadingSpinner />);
  const formikError = formik.errors[fieldName] as string;
  const formikTouched = formik.touched[fieldName];

  // Show error if there's an error and the field was touched
  const showError = formikError && formikTouched;

  const handleCategoryClick = async (category: Category) => {
    setChosenCategory(category);
    if (formik) {
      formik.setFieldValue(fieldName, category.id);
      formik.setFieldTouched(fieldName, true, false);
    }
    if (onCategoryChange) {
      await onCategoryChange(category);
    }
  };

  React.useEffect(() => {
    if (categories && categories.length > 0) {
      const categoryDropdownItems = (
        <>
          {categories.map((category: Category, index: number) => (
            <Dropdown.Item
              eventKey={category.id.toString()}
              id={JSON.stringify(category.id)}
              key={index}
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: "pointer" }}
            >
              {getCategoryName(category)}
            </Dropdown.Item>
          ))}
        </>
      );
      setCats(categoryDropdownItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, getCategoryName, formik, fieldName, onCategoryChange]);

  return {
    chosenCategory,
    cats,
    showError: !!showError,
    formikError,
    handleCategoryClick,
    getCategoryName,
    t,
  };
}

export default useCategoryDropdownArtwork;
