"use client";
import React from "react";

import { Col, Dropdown } from "react-bootstrap";

import { Category } from "@/fetching/types";

import useCategoryDropdownSearch from "./useCategoryDropdownSearch";

type CategoryDropdownSearchProps = {
  categories: Category[];
  setValue: (value: string) => void;
};

function CategoryDropdownSearch({
  categories,
  setValue,
}: CategoryDropdownSearchProps) {
  const { t, cats, handleCategorySelect } = useCategoryDropdownSearch({
    categories,
    setValue,
  });

  return (
    <Col className="mx-auto mb-3">
      <Dropdown onSelect={handleCategorySelect}>
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
