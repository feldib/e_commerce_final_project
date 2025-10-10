"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import SubPageTitle from "@/components/layout/SubPageTitle/SubPageTitle";

import useReviews from "./useReviews";

function Reviews() {
  const { t, representReviews } = useReviews();

  return (
    <Col className="mx-auto">
      <SubPageTitle title={t("app.admin.reviews.title")} />
      <Row>{representReviews}</Row>
    </Col>
  );
}

export default Reviews;
