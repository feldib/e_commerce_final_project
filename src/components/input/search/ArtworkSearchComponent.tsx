"use client";
import React from "react";

import { Button, Col, Form, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";
import AdminArtworkTable from "@/components/tables/admin/AdminArtworkTable";
import BuyTable from "@/components/tables/buy/BuyTable";

import ArtworkSearchFields from "./ArtworkSearchFields";
import useArtworkSearchComponent from "./hooks/useArtworkSearchComponent";

type ArtworkSearchComponentProps = {
  admin?: boolean;
};

function ArtworkSearchComponent({ admin }: ArtworkSearchComponentProps) {
  const {
    searchResults,
    searchedValues,
    hasMoreResults,
    pageNumber,
    formik,
    categories,
    handleBackClick,
    handleNextClick,
    triggerSearchWithUpdatedValues,
    results,
    t,
  } = useArtworkSearchComponent({ admin });

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
            <h3 className="text-center">
              {t("common.messages.search_results")}
            </h3>
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
                  {t("common.actions.back")} {formik.values.n}
                </Button>
              </Col>
            )}

            {hasMoreResults && (
              <Col className="mx-auto">
                <Button className="submit" onClick={handleNextClick}>
                  {t("common.expressions.next")} {formik.values.n}
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
