"use client";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import BuyTable from "@/components/tables/BuyTable";
import useAxios from "@/hooks/useAxios";
import SubPageTitle from "@/components/SubPageTitle";
import { Artwork } from "@/fetching/types";

function WishList() {
  const wishListed = useAxios("/users/wishlisted") as Artwork[];

  if (!wishListed || !Array.isArray(wishListed)) {
    return (
      <Container className="mb-5 pb-5">
        <Row className="px-3">
          <SubPageTitle title="Wishlisted" />
          <Row className="mx-auto floating-element">
            <Col className="text-center">Loading...</Col>
          </Row>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mb-5 pb-5">
      <Row className="px-3">
        <SubPageTitle title="Wishlisted" />
        <Row className="mx-auto floating-element">
          {wishListed.length !== 0 ? (
            <BuyTable theadNeeded={true} dataLines={wishListed} />
          ) : (
            <Col className="text-center">--- No wishlisted items ---</Col>
          )}
        </Row>
      </Row>
    </Container>
  );
}

export default WishList;
