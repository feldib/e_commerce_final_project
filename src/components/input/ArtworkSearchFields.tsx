"use client";
import React from "react";

import { Button, Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";
import Queries from "@/components/Queries";

import { Category, SearchFormikInstance, SearchParams } from "@/fetching/types";

import CategoryDropdownSearch from "./CategoryDropdownSearch";
import SearchField from "./SearchField";

type ArtworkSearchFieldsProps = {
  formik: SearchFormikInstance;
  categories: Category[];
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>,
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

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);
    formik.setFieldValue("min", value);
  };

  const handleMinBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);
    if (formik.values.min < 0) {
      formik.setFieldValue("min", 0);
    }
    const max = formik.values.max;
    if (max > 0 && max <= formik.values.min) {
      formik.setFieldValue("max", 0);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);
    formik.setFieldValue("max", value);
  };

  const handleMaxBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(e);
    const min = formik.values.min;
    const max = formik.values.max;
    if (min > 0 && max > 0 && min > max) {
      formik.setFieldValue("max", 0);
    }
  };

  const handleNumberOfArtworksSelect = (e: string | null) => {
    formik.setFieldValue("n", Number(e));
    triggerSearchWithUpdatedValues({ n: Number(e) });
  };

  const handleOrderSelect = (e: string | null) => {
    formik.setFieldValue("order", e);
    triggerSearchWithUpdatedValues({ order: e as string });
  };

  const handleOnlyFeaturedChange = () => {
    const newValue = !formik.values.only_featured;
    formik.setFieldValue("only_featured", newValue);
    triggerSearchWithUpdatedValues({ only_featured: newValue });
  };

  const handleSearchClick = () => {
    triggerSearchWithUpdatedValues({});
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

      <Row className="mx-auto mb-5 mt-5" lg={6} sx={8}>
        <InputGroup>
          <InputGroup.Text>{t("common.price_range")}</InputGroup.Text>

          <Form.Control
            name="min"
            onBlur={handleMinBlur}
            onChange={handleMinChange}
            placeholder={t("common.minimum")}
            type="number"
            value={formik.values.min === 0 ? "" : formik.values.min}
          />

          <Form.Control
            name="max"
            onBlur={handleMaxBlur}
            onChange={handleMaxChange}
            placeholder={t("common.maximum")}
            type="number"
            value={formik.values.max === 0 ? "" : formik.values.max}
          />
        </InputGroup>
      </Row>

      <Row className="mx-auto">
        <CategoryDropdownSearch
          categories={categories}
          setValue={(value: string | number) => {
            formik.setFieldValue("category_id", value);
            triggerSearchWithUpdatedValues({ category_id: value.toString() });
          }}
        />

        <Col className="mb-3">
          <Dropdown
            // value={formik.values.n}
            onSelect={handleNumberOfArtworksSelect}
          >
            <Dropdown.Toggle variant="outilne-dark">
              {t("components.search_fields.number_of_artworks_shown")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="5" href="">
                5
              </Dropdown.Item>

              <Dropdown.Item eventKey="10" href="">
                10
              </Dropdown.Item>

              <Dropdown.Item eventKey="20" href="">
                20
              </Dropdown.Item>

              <Dropdown.Item eventKey="30" href="">
                30
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col className="mb-4">
          <Dropdown onSelect={handleOrderSelect}>
            <Dropdown.Toggle variant="outilne-dark">
              {t("common.order_by")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="desc" href="">
                {t("components.search_fields.newest_to_oldest")}
              </Dropdown.Item>

              <Dropdown.Item eventKey="asc" href="">
                {t("components.search_fields.oldest_to_newest")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

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
