"use client";
import React from "react";

import { Dropdown } from "react-bootstrap";
import { FormikProps } from "formik";

import { useI18n } from "@/components/providers/I18nProvider";

import { Category } from "@/fetching/types";

import LoadingSpinner from "../LoadingSpinner";

import { useCategories } from "@/hooks/useCategories";

interface CategoryDropdownArtworkProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  categories: Category[];
  formik?: FormikProps<T>;
  fieldName?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  onCategoryChange?: (category: Category) => Promise<void> | void;
}

function CategoryDropdownArtwork<T extends Record<string, unknown>>({
  categories,
  formik,
  fieldName = "category_id",
  error,
  touched,
  required = false,
  onCategoryChange,
}: CategoryDropdownArtworkProps<T>) {
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
  const formikError = formik?.errors[fieldName] as string;
  const formikTouched = formik?.touched[fieldName];

  const showError = (error && touched) || (formikError && formikTouched);

  React.useEffect(() => {
    if (categories && categories.length > 0) {
      const categoryDropdownItems = (
        <>
          {categories.map((category: Category, index: number) => (
            <Dropdown.Item
              eventKey={category.id.toString()}
              key={index}
              id={JSON.stringify(category.id)}
              style={{ cursor: "pointer" }}
              onClick={async () => {
                setChosenCategory(category);
                if (formik) {
                  formik.setFieldValue(fieldName, category.id);
                  formik.setFieldTouched(fieldName, true, false);
                }
                if (onCategoryChange) {
                  await onCategoryChange(category);
                }
              }}
            >
              {getCategoryName(category)}
            </Dropdown.Item>
          ))}
        </>
      );
      setCats(categoryDropdownItems);
    }
  }, [categories, getCategoryName, formik, fieldName, onCategoryChange]);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant={showError ? "danger" : "outline-dark"}
          className="w-100 text-start d-flex justify-content-between align-items-center"
        >
          <span>
            {chosenCategory
              ? getCategoryName(chosenCategory)
              : t("common.choose")}
            {required && !chosenCategory && " *"}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100">{cats}</Dropdown.Menu>
      </Dropdown>
      {showError && (
        <div className="text-danger small mt-1">{error || formikError}</div>
      )}
    </>
  );
}

export default CategoryDropdownArtwork;
