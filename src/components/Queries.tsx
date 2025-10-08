"use client";

import React from "react";

import { Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { Category, SearchFormikInstance, SearchParams } from "@/fetching/types";

import Query from "./Query";

import { useCategories } from "@/hooks/useCategories";

type QueriesProps = {
  formik: SearchFormikInstance;
  categories: Category[];
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>
  ) => void;
  searchedValues?: SearchParams;
};

function Queries({
  formik,
  categories,
  triggerSearchWithUpdatedValues,
  searchedValues,
}: QueriesProps) {
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

  return (
    <Row>
      {searchedValues &&
        searchedValues.min > 0 &&
        searchedValues.max > 0 &&
        searchedValues.min < searchedValues.max && (
          <Query
            remove={handleRemoveBetween}
            text={`Between ${searchedValues.min} and ${searchedValues.max}`}
          />
        )}

      {searchedValues &&
        searchedValues.min > 0 &&
        (searchedValues.max === 0 ||
          searchedValues.min >= searchedValues.max) && (
          <Query
            remove={handleRemoveMin}
            text={`Minimum: ${searchedValues.min}`}
          />
        )}

      {searchedValues && searchedValues.max > 0 && searchedValues.min === 0 && (
        <Query
          remove={handleRemoveMax}
          text={`Maximum: ${searchedValues.max}`}
        />
      )}

      {searchedValues && searchedValues.title && (
        <Query
          remove={handleRemoveTitle}
          text={`Title: ${searchedValues.title}`}
        />
      )}

      {searchedValues && searchedValues.artist_name && (
        <Query
          remove={handleRemoveArtist}
          text={`Artist: ${searchedValues.artist_name}`}
        />
      )}

      {searchedValues && searchedValues.category_id && (
        <Query
          remove={handleRemoveCategory}
          text={getCurrentCategoryName(searchedValues.category_id)}
        />
      )}
    </Row>
  );
}

export default Queries;
