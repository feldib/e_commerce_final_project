"use client";

import React from "react";

import { Form, InputGroup, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { SearchFormikInstance } from "@/fetching/types";

type PriceRangeInputProps = {
  formik: SearchFormikInstance;
};

function PriceRangeInput({ formik }: PriceRangeInputProps) {
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
