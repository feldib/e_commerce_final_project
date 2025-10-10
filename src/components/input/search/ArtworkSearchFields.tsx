"use client";
import React from "react";

import { Button, Col, Form, Row } from "react-bootstrap";

import Queries from "@/components/search/Queries";

import { Category, SearchFormikInstance, SearchParams } from "@/fetching/types";

import CategoryDropdownSearch from "../category_dropdown/CategoryDropdownSearch";
import useArtworkSearchFields from "./hooks/useArtworkSearchFields";
import NumberOfArtworksDropdown from "./NumberOfArtworksDropdown";
import OrderByDropdown from "./OrderByDropdown";
import PriceRangeInput from "./PriceRangeInput";
import SearchField from "./SearchField";

type ArtworkSearchFieldsProps = {
  formik: SearchFormikInstance;
  categories: Category[];
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>
  ) => void;
  searchedValues?: SearchParams;
};

function ArtworkSearchFields({
  formik,
  categories,
  triggerSearchWithUpdatedValues,
  searchedValues,
}: ArtworkSearchFieldsProps) {
  const {
    t,
    handleOnlyFeaturedChange,
    handleSearchClick,
    handleCategoryChange,
  } = useArtworkSearchFields({
    formik,
    categories,
    triggerSearchWithUpdatedValues,
    searchedValues,
  });

  return (
    <div className="floating-element mb-3 mx-5">
      <SearchField
        name="title"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.title}
        what={t("common.fields.title")}
      />

      <SearchField
        name="artist_name"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.artist_name}
        what={t("common.fields.artist")}
      />

      <PriceRangeInput formik={formik} />

      <Row className="mx-auto">
        <CategoryDropdownSearch
          categories={categories}
          setValue={handleCategoryChange}
        />

        <NumberOfArtworksDropdown
          formik={formik}
          triggerSearchWithUpdatedValues={triggerSearchWithUpdatedValues}
        />

        <OrderByDropdown
          formik={formik}
          triggerSearchWithUpdatedValues={triggerSearchWithUpdatedValues}
        />

        <Col className="mb-3">
          <Form.Check
            id="only_featured"
            label={t("common.search.only_featured")}
            onChange={handleOnlyFeaturedChange}
            type="switch"
          />
        </Col>
      </Row>

      <Row className="mx-auto mb-3 text-end">
        <Col>
          <Button className="submit" onClick={handleSearchClick} type="submit">
            {t("components.search_fields.search")}
          </Button>
        </Col>
      </Row>

      <Queries
        categories={categories}
        formik={formik}
        searchedValues={searchedValues}
        triggerSearchWithUpdatedValues={triggerSearchWithUpdatedValues}
      />
    </div>
  );
}

export default ArtworkSearchFields;
