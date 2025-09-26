"use client";
import React from "react";

import { Col } from "react-bootstrap";

import ShoppingCartComponent from "@/components/ShoppingCartComponent";
import SubPageTitle from "@/components/SubPageTitle";

function ShoppingCartSubPage() {
  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title="Shopping cart" />
      <ShoppingCartComponent />
    </Col>
  );
}

export default ShoppingCartSubPage;
