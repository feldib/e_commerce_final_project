"use client";

import React from "react";

import { Dropdown } from "react-bootstrap";

import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { Category } from "@/fetching/types";

import { useCategories } from "@/hooks/useCategories";

type UseCategoryDropdownSearchProps = {
  categories: Category[];
  setValue: (value: string) => void;
};

type UseCategoryDropdownSearchReturn = {
  t: (key: string) => string;
  cats: React.JSX.Element;
  handleCategorySelect: (e: string | null) => void;
};

function useCategoryDropdownSearch({
  categories,
  setValue,
}: UseCategoryDropdownSearchProps): UseCategoryDropdownSearchReturn {
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

  const handleCategorySelect = (e: string | null) => {
    if (e !== null) {
      setValue(e);
    }
  };

  return {
    t,
    cats,
    handleCategorySelect,
  };
}

export default useCategoryDropdownSearch;
