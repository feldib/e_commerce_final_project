"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import SubPageTitle from "@/components/layout/SubPageTitle/SubPageTitle";

import useUserReviews from "./useUserReviews";

function Reviews() {
  const { t, representReviews } = useUserReviews();

  return (
    <Col className="mx-auto">
      <SubPageTitle title={t("app.user.reviews.title")} />
      <Row>{representReviews}</Row>
    </Col>
  );
}

export default Reviews;
