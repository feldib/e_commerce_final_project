"use client";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import BuyTable from "@/components/tables/BuyTable";
import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";
import SubPageTitle from "@/components/SubPageTitle";
import { Artwork } from "@/fetching/types";

function WishList() {
  const wishListed = useAxios("/users/wishlisted") as Artwork[];

  const wishlistContent = useLoading(wishListed, (data) => (
    <Row className="mx-auto floating-element">
      {data.length !== 0 ? (
        <BuyTable theadNeeded={true} dataLines={data} />
      ) : (
        <Col className="text-center">--- No wishlisted items ---</Col>
      )}
    </Row>
  ));

  return (
    <Container className="mb-5 pb-5">
      <Row className="px-3">
        <SubPageTitle title="Wishlisted" />
        {wishlistContent}
      </Row>
    </Container>
  );
}

export default WishList;
