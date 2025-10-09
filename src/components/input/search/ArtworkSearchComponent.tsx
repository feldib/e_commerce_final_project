"use client";
import React from "react";

import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useI18n } from "@/components/providers/I18nProvider";
import AdminArtworkTable from "@/components/tables/admin/AdminArtworkTable";
import BuyTable from "@/components/tables/buy/BuyTable";

import { getArtworkSearchResults } from "@/fetching/fetching";
import { Artwork, Category, SearchParams } from "@/fetching/types";

import ArtworkSearchFields from "./ArtworkSearchFields";

import useAxios from "@/hooks/useAxios";

type ArtworkSearchComponentProps = {
  admin?: boolean;
};

function ArtworkSearchComponent({ admin }: ArtworkSearchComponentProps) {
  const [searchResults, setSearchResults] = React.useState<Artwork[]>();
  const [searchedValues, setSearchedValues] = React.useState<SearchParams>();
  const [hasMoreResults, setHasMoreResults] = React.useState(false);
  const { t } = useI18n();

  const [pageNumber, setPageNumber] = React.useState(0);

  const handleBackClick = () => {
    const newPageNumber = pageNumber - 1;
    setPageNumber(newPageNumber);
    search(formik.values, newPageNumber);
  };

  const handleNextClick = () => {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);
    search(formik.values, newPageNumber);
  };

  const search = React.useCallback(
    async (values: SearchParams, page: number) => {
      const results = await getArtworkSearchResults(
        values,
        page,
        admin || false
      );
      setSearchResults(results);
      setSearchedValues(values);
      // If we got exactly the requested number of results, there might be more
      setHasMoreResults(results.length === values.n);
    },
    [admin]
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
        categories={categories}
        formik={formik}
        searchedValues={searchedValues}
        triggerSearchWithUpdatedValues={triggerSearchWithUpdatedValues}
      />

      {searchResults && (
        <Row className="floating-element mt-5 mb-5 mx-2">
          <Row
            className="mb-3 mt-2"
            ref={results as React.RefObject<HTMLDivElement>}
          >
            <h3 className="text-center">{t("app.search.search_results")}</h3>
          </Row>
          {admin ? (
            <AdminArtworkTable dataLines={searchResults} />
          ) : (
            <BuyTable dataLines={searchResults} recommendation={false} />
          )}

          <Row className="pt-3 pb-3 text-center">
            {pageNumber > 1 && (
              <Col className="mx-auto">
                <Button className="submit" onClick={handleBackClick}>
                  {t("common.back")} {formik.values.n}
                </Button>
              </Col>
            )}

            {hasMoreResults && (
              <Col className="mx-auto">
                <Button className="submit" onClick={handleNextClick}>
                  {t("common.next")} {formik.values.n}
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
