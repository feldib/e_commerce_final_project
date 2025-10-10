"use client";
import React from "react";

import { Col, Dropdown } from "react-bootstrap";

import { Category } from "@/fetching/types";

import useCategoryDropdown from "./useCategoryDropdown";

type CategoryDropdownSearchProps = {
  categories: Category[];
  setValue: (value: string) => void;
};

/**
 * A dropdown component for filtering by categories in search interfaces
 */
function CategoryDropdownSearch({
  categories,
  setValue,
}: CategoryDropdownSearchProps) {
  const { cats, handleDropdownSelect, t } = useCategoryDropdown({
    categories,
    setValue,
  });

  return (
    <Col className="mx-auto mb-3">
      <Dropdown onSelect={handleDropdownSelect}>
        <Dropdown.Toggle variant="outilne-dark">
          {t("common.fields.categories")}
        </Dropdown.Toggle>
        <Dropdown.Menu className="px-3">
          <Dropdown.Item
            eventKey={""}
            id={"all"}
            key={"all"}
            style={{ cursor: "pointer" }}
          >
            {t("common.expressions.all")}
          </Dropdown.Item>
          {cats}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}

export default CategoryDropdownSearch;
