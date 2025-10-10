"use client";

import React from "react";

import { Form, InputGroup, Row } from "react-bootstrap";

import { SearchFormikInstance } from "@/fetching/types";

import usePriceRangeInput from "./hooks/usePriceRangeInput";

type PriceRangeInputProps = {
  formik: SearchFormikInstance;
};

function PriceRangeInput({ formik }: PriceRangeInputProps) {
  const { t, handleMinChange, handleMinBlur, handleMaxChange, handleMaxBlur } =
    usePriceRangeInput({ formik });

  return (
    <Row className="mx-auto mb-5 mt-5" lg={6} sx={8}>
      <InputGroup>
        <InputGroup.Text>{t("common.search.price_range")}</InputGroup.Text>

        <Form.Control
          name="min"
          onBlur={handleMinBlur}
          onChange={handleMinChange}
          placeholder={t("common.fields.minimum")}
          type="number"
          value={formik.values.min === 0 ? "" : formik.values.min}
        />

        <Form.Control
          name="max"
          onBlur={handleMaxBlur}
          onChange={handleMaxChange}
          placeholder={t("common.fields.maximum")}
          type="number"
          value={formik.values.max === 0 ? "" : formik.values.max}
        />
      </InputGroup>
    </Row>
  );
}

export default PriceRangeInput;
