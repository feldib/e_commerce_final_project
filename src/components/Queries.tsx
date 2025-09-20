import React from "react";
import { Row } from "react-bootstrap";
import Query from "./Query";
import { SearchFormikInstance, Category, SearchParams } from "@/fetching/types";

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
  return (
    <Row>
      {searchedValues &&
        searchedValues.min > 0 &&
        searchedValues.max > 0 &&
        searchedValues.min < searchedValues.max && (
          <Query
            text={`Between ${searchedValues.min} and ${searchedValues.max}`}
            remove={() => {
              formik.setFieldValue("max", 0);
              formik.setFieldValue("min", 0);
              triggerSearchWithUpdatedValues({ max: 0, min: 0 });
            }}
          />
        )}

      {searchedValues &&
        searchedValues.min > 0 &&
        (searchedValues.max === 0 ||
          searchedValues.min >= searchedValues.max) && (
          <Query
            text={`Minimum: ${searchedValues.min}`}
            remove={() => {
              formik.setFieldValue("min", 0);
              triggerSearchWithUpdatedValues({ min: 0 });
            }}
          />
        )}

      {searchedValues && searchedValues.max > 0 && searchedValues.min === 0 && (
        <Query
          text={`Maximum: ${searchedValues.max}`}
          remove={() => {
            formik.setFieldValue("max", 0);
            triggerSearchWithUpdatedValues({ max: 0 });
          }}
        />
      )}

      {searchedValues && searchedValues.title && (
        <Query
          text={`Title: ${searchedValues.title}`}
          remove={() => {
            formik.setFieldValue("title", "");
            triggerSearchWithUpdatedValues({ title: "" });
          }}
        />
      )}

      {searchedValues && searchedValues.artist_name && (
        <Query
          text={`Artist: ${searchedValues.artist_name}`}
          remove={() => {
            formik.setFieldValue("artist_name", "");
            triggerSearchWithUpdatedValues({ artist_name: "" });
          }}
        />
      )}

      {searchedValues && searchedValues.category_id && (
        <Query
          text={`${
            categories.find((cat) => {
              return cat.id === parseInt(searchedValues.category_id!);
            })?.cname || "Unknown Category"
          }`}
          remove={() => {
            formik.setFieldValue("category_id", "");
            triggerSearchWithUpdatedValues({ category_id: "" });
          }}
        />
      )}
    </Row>
  );
}

export default Queries;
