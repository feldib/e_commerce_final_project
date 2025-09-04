import React from "react";
import { Col, Dropdown } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";

type CategoriesDropdownProps = {
  categories: any;
  setValue: (value: string | number) => void;
};

function CategoriesDropdown(props: CategoriesDropdownProps) {
  function createCategoryButtons(categories: any) {
    return categories.map((category: any, index: number) => {
      return (
        <Dropdown.Item
          eventKey={category.id}
          key={index}
          id={category.id}
          style={{ cursor: "pointer" }}
        >
          {category.cname}
        </Dropdown.Item>
      );
    });
  }
  const categories = useLoading(props.categories, createCategoryButtons);
  return (
    <Col className="mx-auto mb-3">
      <Dropdown
        onSelect={(e: any) => {
          props.setValue(e);
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
          {categories}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}

export default CategoriesDropdown;
