"use client";
import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import ShoppingCartComponent from "@/components/ShoppingCartComponent";

function ShoppingCartPage() {
  return (
    <Container className="pb-5 mb-5">
      <PageTitle title="Shopping cart" />
      <ShoppingCartComponent />
    </Container>
  );
}

export default ShoppingCartPage;
