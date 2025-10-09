"use client";
import React from "react";

import { Button, Col, Form, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";
import Queries from "@/components/Queries";

import { Category, SearchFormikInstance, SearchParams } from "@/fetching/types";

import CategoryDropdownSearch from "./CategoryDropdownSearch";
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
  const { t } = useI18n();

  const handleOnlyFeaturedChange = () => {
    const newValue = !formik.values.only_featured;
    formik.setFieldValue("only_featured", newValue);
    triggerSearchWithUpdatedValues({ only_featured: newValue });
  };

  const handleSearchClick = () => {
    triggerSearchWithUpdatedValues({});
  };

  const handleCategoryChange = (value: string | number) => {
    formik.setFieldValue("category_id", value);
    triggerSearchWithUpdatedValues({ category_id: value.toString() });
  };

  return (
    <div className="floating-element mb-3 mx-5">
      <SearchField
        name="title"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.title}
        what={t("components.search_fields.title")}
      />

      <SearchField
        name="artist_name"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.artist_name}
        what={t("components.search_fields.artist")}
      />

      <PriceRangeInput
        formik={formik}
        triggerSearchWithUpdatedValues={triggerSearchWithUpdatedValues}
      />

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
            label={t("components.search_fields.only_featured")}
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
