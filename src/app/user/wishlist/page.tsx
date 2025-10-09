"use client";
import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import SubPageTitle from "@/components/layout/SubPageTitle";
import { useI18n } from "@/components/providers/I18nProvider";
import BuyTable from "@/components/tables/buy/BuyTable";

import { Artwork } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

function WishList() {
  const { t } = useI18n();
  const wishListed = useAxios("/users/wishlisted") as Artwork[];

  const wishlistContent = useLoading(wishListed, (data) => (
    <Row className="mx-auto floating-element">
      {data.length !== 0 ? (
        <BuyTable dataLines={data} />
      ) : (
        <Col className="text-center">
          {t("app.user.wishlist.no_wishlisted_items")}
        </Col>
      )}
    </Row>
  ));

  return (
    <Container className="mb-5 pb-5">
      <Row className="px-3">
        <SubPageTitle title={t("app.user.wishlist.title")} />
        {wishlistContent}
      </Row>
    </Container>
  );
}

export default WishList;
