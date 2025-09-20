"use client";
import React from "react";
import useAxios from "@/hooks/useAxios";
import { getArtworkSearchResults } from "@/fetching/fetching";
import { Row, Form, Col, Button } from "react-bootstrap";
import BuyTable from "@/components/tables/BuyTable";
import AdminArtworkTable from "@/components/tables/AdminArtworkTable";
import ArtworkSearchFields from "./ArtworkSearchFields";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Artwork, Category, SearchParams } from "@/fetching/types";

type ArtworkSearchComponentProps = {
  admin?: boolean;
};

function ArtworkSearchComponent({ admin }: ArtworkSearchComponentProps) {
  const [searchResults, setSearchResults] = React.useState<Artwork[]>();
  const [searchedValues, setSearchedValues] = React.useState<SearchParams>();

  const [pageNumber, setPageNumber] = React.useState(0);

  const search = React.useCallback(
    async (values: SearchParams, page: number) => {
      const results = await getArtworkSearchResults(values, page);
      setSearchResults(results);
      setSearchedValues(values);
    },
    []
  );

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: "",
      artist_name: "",
      category_id: "",
      order: "asc",
      n: 5,
      min: 0,
      max: 0,
      only_featured: false,
    },

    onSubmit: (values) => {
      setPageNumber(1);
      search(values, 1);
    },

    validationSchema: Yup.object().shape({
      min: Yup.number().min(0),
      max: Yup.number().min(1),
    }),
  });

  const categories = useAxios("/categories") as Category[];

  const triggerSearchWithUpdatedValues = React.useCallback(
    (updatedValues: Partial<SearchParams>) => {
      const newValues = { ...formik.values, ...updatedValues };
      setPageNumber(1);
      search(newValues, 1);
    },
    [search, formik.values]
  );

  const results = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    results.current?.scrollIntoView({ behavior: "instant" });
  }, [searchResults]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <ArtworkSearchFields
        formik={formik}
        categories={categories}
        triggerSearchWithUpdatedValues={triggerSearchWithUpdatedValues}
        searchedValues={searchedValues}
      />

      {searchResults && (
        <Row className="floating-element mt-5 mb-5 mx-2">
          <Row
            className="mb-3 mt-2"
            ref={results as React.RefObject<HTMLDivElement>}
          >
            <h3 className="text-center">Search results</h3>
          </Row>
          {admin ? (
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
                    const newPageNumber = pageNumber - 1;
                    setPageNumber(newPageNumber);
                    search(formik.values, newPageNumber);
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
                  onClick={() => {
                    const newPageNumber = pageNumber + 1;
                    setPageNumber(newPageNumber);
                    search(formik.values, newPageNumber);
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
