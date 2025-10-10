"use client";

import React from "react";

import { Row } from "react-bootstrap";

import { Category, SearchFormikInstance, SearchParams } from "@/fetching/types";

import Query from "../Query/Query";
import useQueries from "./useQueries";

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
  const {
    getCurrentCategoryName,
    handleRemoveBetween,
    handleRemoveMin,
    handleRemoveMax,
    handleRemoveTitle,
    handleRemoveArtist,
    handleRemoveCategory,
  } = useQueries({
    formik,
    categories,
    triggerSearchWithUpdatedValues,
    searchedValues,
  });

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
