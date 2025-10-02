"use client";
import React from "react";

import { Col, Dropdown } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { Category } from "@/fetching/types";

import LoadingSpinner from "../LoadingSpinner";

import { useCategories } from "@/hooks/useCategories";

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
  const { t, locale } = useI18n();
  const { getCategoryName } = useCategories(locale);

  const [cats, setCats] = React.useState<React.JSX.Element>(<LoadingSpinner />);

  React.useEffect(() => {
    if (categories && categories.length > 0) {
      const categoryButtons = (
        <>
          {categories.map((category: Category, index: number) => (
            <Dropdown.Item
              eventKey={category.id.toString()}
              key={index}
              id={JSON.stringify(category.id)}
              style={{ cursor: "pointer" }}
            >
              {getCategoryName(category)}
            </Dropdown.Item>
          ))}
        </>
      );
      setCats(categoryButtons);
    }
  }, [categories, getCategoryName]);

  return (
    <Col className="mx-auto mb-3">
      <Dropdown
        onSelect={(e: string | null) => {
          if (e !== null) {
            setValue(e);
          }
        }}
      >
        <Dropdown.Toggle variant="outilne-dark">
          {t("common.categories")}
        </Dropdown.Toggle>
        <Dropdown.Menu className="px-3">
          <Dropdown.Item
            eventKey={""}
            key={"all"}
            id={"all"}
            style={{ cursor: "pointer" }}
          >
            {t("common.all")}
          </Dropdown.Item>
          {cats}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}

export default CategoryDropdownSearch;
