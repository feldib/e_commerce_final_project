"use client";
import React from "react";

import { Col, Dropdown } from "react-bootstrap";

import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { useI18n } from "@/components/providers/I18nProvider";

import { Category } from "@/fetching/types";

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

  const handleDropdownSelect = (e: string | null) => {
    if (e !== null) {
      setValue(e);
    }
  };

  React.useEffect(() => {
    if (categories && categories.length > 0) {
      const categoryButtons = (
        <>
          {categories.map((category: Category, index: number) => (
            <Dropdown.Item
              eventKey={category.id.toString()}
              id={JSON.stringify(category.id)}
              key={index}
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
