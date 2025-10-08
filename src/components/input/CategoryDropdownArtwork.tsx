"use client";
import React from "react";

import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Form } from "react-bootstrap";
import { FormikProps } from "formik";

import { useI18n } from "@/components/providers/I18nProvider";

import { Category } from "@/fetching/types";

import LoadingSpinner from "../LoadingSpinner";

import { useCategories } from "@/hooks/useCategories";

interface CategoryDropdownArtworkProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  categories: Category[];
  formik: FormikProps<T>;
  fieldName?: string;
  label: string;
  onCategoryChange?: (category: Category) => Promise<void> | void;
}

function CategoryDropdownArtwork<T extends Record<string, unknown>>({
  categories,
  formik,
  fieldName = "category_id",
  label,
  onCategoryChange,
}: CategoryDropdownArtworkProps<T>) {
  const { t, locale } = useI18n();
  const { getCategoryName } = useCategories(locale);

  const [chosenCategory, setChosenCategory] = React.useState<Category | null>(
    formik && formik.values[fieldName]
      ? categories?.find(
          (cat) => cat.id === Number(formik.values[fieldName]),
        ) || null
      : null,
  );

  React.useEffect(() => {
    if (formik && formik.values[fieldName] && categories) {
      const category = categories.find(
        (cat) => cat.id === Number(formik.values[fieldName]),
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

  return (
    <Form.Group className="pb-3">
      <Form.Label>{label}</Form.Label>
      {showError && (
        <FontAwesomeIcon
          className="mx-3"
          icon={faAsterisk}
          style={{ color: "red" }}
        />
      )}
      <Dropdown>
        <Dropdown.Toggle
          className="w-100 text-start d-flex justify-content-between align-items-center"
          variant={showError ? "danger" : "outline-dark"}
        >
          <span>
            {chosenCategory
              ? getCategoryName(chosenCategory)
              : t("common.choose")}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100">{cats}</Dropdown.Menu>
      </Dropdown>
      {showError && <div className="text-danger small mt-1">{formikError}</div>}
    </Form.Group>
  );
}

export default CategoryDropdownArtwork;
