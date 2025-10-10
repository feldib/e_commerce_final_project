"use client";

import React from "react";

import { Dropdown } from "react-bootstrap";

import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { Category } from "@/fetching/types";

import { useCategories } from "@/hooks/useCategories";

type UseCategoryDropdownProps = {
  categories: Category[];
  setValue: (value: string) => void;
};

type UseCategoryDropdownReturn = {
  cats: React.JSX.Element;
  handleDropdownSelect: (e: string | null) => void;
  t: (key: string) => string;
};

function useCategoryDropdown({
  categories,
  setValue,
}: UseCategoryDropdownProps): UseCategoryDropdownReturn {
  const { locale, t } = useI18n();
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

  return {
    cats,
    handleDropdownSelect,
    t,
  };
}

export default useCategoryDropdown;
