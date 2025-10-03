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
  return (
    <div className="floating-element mb-3 mx-5">
      <SearchField
        what={t("components.search_fields.title")}
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />

      <SearchField
        what={t("components.search_fields.artist")}
        name="artist_name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.artist_name}
      />

      <Row lg={6} sx={8} className="mx-auto mb-5 mt-5">
        <InputGroup>
          <InputGroup.Text>{t("common.price_range")}</InputGroup.Text>

          <Form.Control
            type="number"
            placeholder={t("common.minimum")}
            name="min"
            value={formik.values.min === 0 ? "" : formik.values.min}
            onChange={(e) => {
              const value =
                e.target.value === "" ? 0 : parseInt(e.target.value);
              formik.setFieldValue("min", value);
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              if (formik.values.min < 0) {
                formik.setFieldValue("min", 0);
              }
              const max = formik.values.max;
              if (max > 0 && max <= formik.values.min) {
                formik.setFieldValue("max", 0);
              }
            }}
          />

          <Form.Control
            type="number"
            placeholder={t("common.maximum")}
            name="max"
            value={formik.values.max === 0 ? "" : formik.values.max}
            onChange={(e) => {
              const value =
                e.target.value === "" ? 0 : parseInt(e.target.value);
              formik.setFieldValue("max", value);
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              const min = formik.values.min;
              const max = formik.values.max;
              if (min > 0 && max > 0 && min > max) {
                formik.setFieldValue("max", 0);
              }
            }}
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
            onSelect={(e) => {
              formik.setFieldValue("n", Number(e));
              triggerSearchWithUpdatedValues({ n: Number(e) });
            }}
          >
            <Dropdown.Toggle variant="outilne-dark">
              {t("components.search_fields.number_of_artworks_shown")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="" eventKey="5">
                5
              </Dropdown.Item>

              <Dropdown.Item href="" eventKey="10">
                10
              </Dropdown.Item>

              <Dropdown.Item href="" eventKey="20">
                20
              </Dropdown.Item>

              <Dropdown.Item href="" eventKey="30">
                30
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col className="mb-4">
          <Dropdown
            onSelect={(e) => {
              formik.setFieldValue("order", e);
              triggerSearchWithUpdatedValues({ order: e as string });
            }}
          >
            <Dropdown.Toggle variant="outilne-dark">
              {t("common.order_by")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="" eventKey="desc">
                {t("components.search_fields.newest_to_oldest")}
              </Dropdown.Item>

              <Dropdown.Item href="" eventKey="asc">
                {t("components.search_fields.oldest_to_newest")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col className="mb-3">
          <Form.Check
            type="switch"
            label={t("components.search_fields.only_featured")}
            id="only_featured"
            onChange={() => {
              const newValue = !formik.values.only_featured;
              formik.setFieldValue("only_featured", newValue);
              triggerSearchWithUpdatedValues({ only_featured: newValue });
            }}
          />
        </Col>
      </Row>

      <Row className="mx-auto mb-3 text-end">
        <Col>
          <Button
            className="submit"
            type="submit"
            onClick={() => {
              triggerSearchWithUpdatedValues({});
            }}
          >
            {t("components.search_fields.search")}
          </Button>
        </Col>
      </Row>

      <Queries
        formik={formik}
        categories={categories}
        triggerSearchWithUpdatedValues={triggerSearchWithUpdatedValues}
        searchedValues={searchedValues}
      />
    </div>
  );
}

export default ArtworkSearchFields;
