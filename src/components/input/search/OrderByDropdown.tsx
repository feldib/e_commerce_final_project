"use client";

import React from "react";

import { Col, Dropdown } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { SearchFormikInstance, SearchParams } from "@/fetching/types";

type OrderByDropdownProps = {
  formik: SearchFormikInstance;
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>
  ) => void;
};

function OrderByDropdown({
  formik,
  triggerSearchWithUpdatedValues,
}: OrderByDropdownProps) {
  const { t } = useI18n();

  const handleOrderSelect = (e: string | null) => {
    formik.setFieldValue("order", e);
    triggerSearchWithUpdatedValues({ order: e as string });
  };

  return (
    <Col className="mb-4">
      <Dropdown onSelect={handleOrderSelect}>
        <Dropdown.Toggle variant="outilne-dark">
          {t("common.search.order_by")}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="desc" href="">
            {t("common.search.newest_to_oldest")}
          </Dropdown.Item>

          <Dropdown.Item eventKey="asc" href="">
            {t("common.search.oldest_to_newest")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}

export default OrderByDropdown;
