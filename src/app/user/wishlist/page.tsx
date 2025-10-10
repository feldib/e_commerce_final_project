"use client";
import React from "react";

import { Container, Row } from "react-bootstrap";

import SubPageTitle from "@/components/layout/SubPageTitle";

import useUserWishlist from "./useUserWishlist";

function WishList() {
  const { t, wishlistContent } = useUserWishlist();

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
