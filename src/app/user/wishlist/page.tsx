"use client";
import React from "react";
import { Row, Container } from "react-bootstrap";
import BuyTable from "../../../components/tables/BuyTable";
import useAxios from "../../../hooks/useAxios";
import SubPageTitle from "../../../components/SubPageTitle";

function WishList() {
  const wishListed = useAxios("/users/wishlisted");
  return (
    <Container className="mb-5 pb-5">
      <Row className="px-3">
        <SubPageTitle title="Wishlisted" />
        <Row className="mx-auto floating-element">
          <BuyTable theadNeeded={true} dataLines={wishListed} />
        </Row>
      </Row>
    </Container>
  );
}

export default WishList;
