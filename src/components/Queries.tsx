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
  return (
    <Row>
      {searchedValues &&
        searchedValues.min > 0 &&
        searchedValues.max > 0 &&
        searchedValues.min < searchedValues.max && (
          <Query
            remove={() => {
              formik.setFieldValue("max", 0);
              formik.setFieldValue("min", 0);
              triggerSearchWithUpdatedValues({ max: 0, min: 0 });
            }}
            text={`Between ${searchedValues.min} and ${searchedValues.max}`}
          />
        )}

      {searchedValues &&
        searchedValues.min > 0 &&
        (searchedValues.max === 0 ||
          searchedValues.min >= searchedValues.max) && (
          <Query
            remove={() => {
              formik.setFieldValue("min", 0);
              triggerSearchWithUpdatedValues({ min: 0 });
            }}
            text={`Minimum: ${searchedValues.min}`}
          />
        )}

      {searchedValues && searchedValues.max > 0 && searchedValues.min === 0 && (
        <Query
          remove={() => {
            formik.setFieldValue("max", 0);
            triggerSearchWithUpdatedValues({ max: 0 });
          }}
          text={`Maximum: ${searchedValues.max}`}
        />
      )}

      {searchedValues && searchedValues.title && (
        <Query
          remove={() => {
            formik.setFieldValue("title", "");
            triggerSearchWithUpdatedValues({ title: "" });
          }}
          text={`Title: ${searchedValues.title}`}
        />
      )}

      {searchedValues && searchedValues.artist_name && (
        <Query
          remove={() => {
            formik.setFieldValue("artist_name", "");
            triggerSearchWithUpdatedValues({ artist_name: "" });
          }}
          text={`Artist: ${searchedValues.artist_name}`}
        />
      )}

      {searchedValues && searchedValues.category_id && (
        <Query
          remove={() => {
            formik.setFieldValue("category_id", "");
            triggerSearchWithUpdatedValues({ category_id: "" });
          }}
          text={getCurrentCategoryName(searchedValues.category_id)}
        />
      )}
    </Row>
  );
}

export default Queries;
