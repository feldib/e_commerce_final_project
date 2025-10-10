"use client";
import React from "react";

import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Form } from "react-bootstrap";
import { FormikProps } from "formik";

import { Category } from "@/fetching/types";

import useCategoryDropdownArtwork from "./useCategoryDropdownArtwork";

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
  const { chosenCategory, cats, showError, formikError, getCategoryName, t } =
    useCategoryDropdownArtwork({
      categories,
      formik,
      fieldName,
      onCategoryChange,
    });

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
              : t("common.actions.choose")}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100">{cats}</Dropdown.Menu>
      </Dropdown>
      {showError && <div className="text-danger small mt-1">{formikError}</div>}
    </Form.Group>
  );
}

export default CategoryDropdownArtwork;
