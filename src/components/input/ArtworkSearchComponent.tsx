"use client";
import React from "react";
import useAxios from "../../hooks/useAxios";
import { getArtworkSearchResults } from "@/fetching/fetching";
import { Row, Form, Col, Button } from "react-bootstrap";
import BuyTable from "../tables/BuyTable";
import AdminArtworkTable from "../tables/AdminArtworkTable";
import ArtworkSearchFields from "./ArtworkSearchFields";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Artwork } from "@/fetching/types";

type ArtworkSearchComponentProps = {
  admin?: boolean;
};

function ArtworkSearchComponent(props: ArtworkSearchComponentProps) {
  const [searchResults, setSearchResults] = React.useState<Artwork[]>();

  const [pageNumber, setPageNumber] = React.useState(0);

  async function search(values: any) {
    const results = await getArtworkSearchResults(values, pageNumber);
    setSearchResults(results);
  }

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: "",
      artist_name: "",
      category_id: "",
      order: "asc",
      n: 5,
      min: "",
      max: "",
      only_featured: false,
    },

    onSubmit: (values) => {
      setPageNumber(1);
      search(values);
    },

    validationSchema: Yup.object().shape({
      min: Yup.number().min(0),
      max: Yup.number().min(1),
    }),
  });

  const categories = useAxios("/categories");

  const results = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (pageNumber) {
      search(formik.values);
    }
  }, [pageNumber]);

  React.useEffect(() => {
    results.current?.scrollIntoView({ behavior: "instant" });
  }, [searchResults]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <ArtworkSearchFields
        formik={formik}
        categories={categories}
        resetPageNumber={() => {
          setPageNumber(1);
        }}
      />

      {searchResults && (
        <Row className="floating-element mt-5 mb-5 mx-2">
          <Row
            className="mb-3 mt-2"
            ref={results as React.RefObject<HTMLDivElement>}
          >
            <h3 className="text-center">Search results</h3>
          </Row>
          {props.admin ? (
            <AdminArtworkTable dataLines={searchResults} />
          ) : (
            <BuyTable
              reccomendation={false}
              theadNeeded={true}
              dataLines={searchResults}
            />
          )}

          <Row className="pt-3 pb-3 text-center">
            {pageNumber > 1 && (
              <Col className="mx-auto">
                <Button
                  className="submit"
                  onClick={() => {
                    setPageNumber(pageNumber - 1);
                  }}
                >
                  Back {formik.values.n}
                </Button>
              </Col>
            )}

            {searchResults.length >= pageNumber * formik.values.n && (
              <Col className="mx-auto">
                <Button
                  className="submit"
                  onClick={async () => {
                    setPageNumber(pageNumber + 1);
                  }}
                >
                  Next {formik.values.n}
                </Button>
              </Col>
            )}
          </Row>
        </Row>
      )}
    </Form>
  );
}

export default ArtworkSearchComponent;
