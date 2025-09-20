import React from "react";
import { Col, Row, Button, Dropdown, InputGroup, Form } from "react-bootstrap";
import SearchField from "./SearchField";
import CategoriesDropdown from "./CategoriesDropdown";
import Queries from "@/components/Queries";
import { SearchFormikInstance, Category } from "@/fetching/types";

type ArtworkSearchFieldsProps = {
  formik: SearchFormikInstance;
  categories: Category[];
  resetPageNumber: () => void;
};

function ArtworkSearchFields({
  formik,
  categories,
  resetPageNumber,
}: ArtworkSearchFieldsProps) {
  return (
    <div className="floating-element mb-3 mx-5">
      <SearchField
        what="Title"
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
      />

      <SearchField
        what="Artist"
        name="artist_name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.artist_name}
      />

      <Row lg={6} sx={8} className="mx-auto mb-5 mt-5">
        <InputGroup>
          <InputGroup.Text>Price range (min, max)</InputGroup.Text>

          <Form.Control
            type="number"
            placeholder="Minimum"
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
            placeholder="Maximum"
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
        <CategoriesDropdown
          categories={categories}
          setValue={(value: string | number) => {
            formik.setFieldValue("category_id", value);
            resetPageNumber();
          }}
        />

        <Col className="mb-3">
          <Dropdown
            // value={formik.values.n}
            onSelect={(e) => {
              formik.setFieldValue("n", Number(e));
            }}
          >
            <Dropdown.Toggle variant="outilne-dark">
              Number of artworks shown
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
            }}
          >
            <Dropdown.Toggle variant="outilne-dark">Order by</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="" eventKey="desc">
                Newest to oldest
              </Dropdown.Item>

              <Dropdown.Item href="" eventKey="asc">
                Oldest to newest
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col className="mb-3">
          <Form.Check
            type="switch"
            label="Only featured"
            id="only_featured"
            onChange={() => {
              formik.setFieldValue(
                "only_featured",
                !formik.values.only_featured
              );
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
              resetPageNumber();
            }}
          >
            Search
          </Button>
        </Col>
      </Row>

      <Queries
        resetPageNumber={resetPageNumber}
        formik={formik}
        categories={categories}
      />
    </div>
  );
}

export default ArtworkSearchFields;
