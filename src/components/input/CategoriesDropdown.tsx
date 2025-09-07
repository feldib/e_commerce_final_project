import React from "react";
import { Col, Dropdown } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import { Category } from "@/fetching/types";

type CategoriesDropdownProps = {
  categories: Category[];
  setValue: (value: string) => void;
};

function CategoriesDropdown({ categories, setValue }: CategoriesDropdownProps) {
  function createCategoryButtons(cats: Category[]) {
    return (
      <>
        {cats.map((category: Category, index: number) => (
          <Dropdown.Item
            eventKey={category.id}
            key={index}
            id={JSON.stringify(category.id)}
            style={{ cursor: "pointer" }}
          >
            {category.cname}
          </Dropdown.Item>
        ))}
      </>
    );
  }
  const cats = useLoading(categories, createCategoryButtons);
  return (
    <Col className="mx-auto mb-3">
      <Dropdown
        onSelect={(e: string | null) => {
          if (e !== null) {
            setValue(e);
          }
        }}
      >
        <Dropdown.Toggle variant="outilne-dark">Categories</Dropdown.Toggle>
        <Dropdown.Menu className="px-3">
          <Dropdown.Item
            eventKey={""}
            key={"all"}
            id={"all"}
            style={{ cursor: "pointer" }}
          >
            All
          </Dropdown.Item>
          {cats}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}

export default CategoriesDropdown;
