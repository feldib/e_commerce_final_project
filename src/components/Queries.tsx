import React from "react";
import { Row } from "react-bootstrap";
import Query from "./Query";
import { SearchFormikInstance, Category } from "../fetching/types";

type QueriesProps = {
  formik: SearchFormikInstance;
  resetPageNumber: () => void;
  categories: Category[];
};

function Queries({ formik, resetPageNumber, categories }: QueriesProps) {
  return (
    <Row>
      {formik.values.min &&
      formik.values.max &&
      formik.values.min > 0 &&
      formik.values.max >= 1 &&
      formik.values.min < formik.values.max ? (
        <Query
          text={`Between ${formik.values.min} and ${formik.values.max}`}
          remove={() => {
            resetPageNumber();
            formik.setFieldValue("max", "");
            formik.setFieldValue("min", "");
            formik.submitForm();
          }}
        />
      ) : formik.values.min && formik.values.min > 0 ? (
        <Query
          text={`Minimum: ${formik.values.min}`}
          remove={() => {
            resetPageNumber();
            formik.setFieldValue("min", "");
            formik.submitForm();
          }}
        />
      ) : (
        formik.values.max &&
        formik.values.max >= 1 && (
          <Query
            text={`Maximum: ${formik.values.max}`}
            remove={() => {
              resetPageNumber();
              formik.setFieldValue("max", "");
              formik.submitForm();
            }}
          />
        )
      )}

      {formik.values.title && (
        <Query
          text={`Title: ${formik.values.title}`}
          remove={() => {
            resetPageNumber();
            formik.setFieldValue("title", "");
            formik.submitForm();
          }}
        />
      )}

      {formik.values.artist_name && (
        <Query
          text={`Artist: ${formik.values.artist_name}`}
          remove={() => {
            resetPageNumber();
            formik.setFieldValue("artist_name", "");
            formik.submitForm();
          }}
        />
      )}

      {formik.values.category_id && (
        <Query
          text={`${
            categories.find((cat) => {
              return cat.id === parseInt(formik.values.category_id!);
            })?.cname || "Unknown Category"
          }`}
          remove={() => {
            resetPageNumber();
            formik.setFieldValue("category_id", "");
            formik.submitForm();
          }}
        />
      )}
    </Row>
  );
}

export default Queries;
