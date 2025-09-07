import React from "react";
import { Row } from "react-bootstrap";
import Query from "./Query";
import { SearchFormikInstance, Category } from "../fetching/types";

type QueriesProps = {
  formik: SearchFormikInstance;
  resetPageNumber: () => void;
  categories: Category[];
};

function Queries(props: QueriesProps) {
  return (
    <Row>
      {props.formik.values.min &&
      props.formik.values.max &&
      props.formik.values.min > 0 &&
      props.formik.values.max >= 1 &&
      props.formik.values.min < props.formik.values.max ? (
        <Query
          text={`Between ${props.formik.values.min} and ${props.formik.values.max}`}
          remove={() => {
            props.resetPageNumber();
            props.formik.setFieldValue("max", "");
            props.formik.setFieldValue("min", "");
            props.formik.submitForm();
          }}
        />
      ) : props.formik.values.min && props.formik.values.min > 0 ? (
        <Query
          text={`Minimum: ${props.formik.values.min}`}
          remove={() => {
            props.resetPageNumber();
            props.formik.setFieldValue("min", "");
            props.formik.submitForm();
          }}
        />
      ) : (
        props.formik.values.max &&
        props.formik.values.max >= 1 && (
          <Query
            text={`Maximum: ${props.formik.values.max}`}
            remove={() => {
              props.resetPageNumber();
              props.formik.setFieldValue("max", "");
              props.formik.submitForm();
            }}
          />
        )
      )}

      {props.formik.values.title && (
        <Query
          text={`Title: ${props.formik.values.title}`}
          remove={() => {
            props.resetPageNumber();
            props.formik.setFieldValue("title", "");
            props.formik.submitForm();
          }}
        />
      )}

      {props.formik.values.artist_name && (
        <Query
          text={`Artist: ${props.formik.values.artist_name}`}
          remove={() => {
            props.resetPageNumber();
            props.formik.setFieldValue("artist_name", "");
            props.formik.submitForm();
          }}
        />
      )}

      {props.formik.values.category_id && (
        <Query
          text={`${
            props.categories.find((cat) => {
              return cat.id === parseInt(props.formik.values.category_id!);
            })?.cname || "Unknown Category"
          }`}
          remove={() => {
            props.resetPageNumber();
            props.formik.setFieldValue("category_id", "");
            props.formik.submitForm();
          }}
        />
      )}
    </Row>
  );
}

export default Queries;
