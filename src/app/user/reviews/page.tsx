"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";
import { users_url } from "../../../utils/api_constants";
import Review from "../../../components/Review";
import SubPageTitle from "../../../components/SubPageTitle";

function Reviews() {
  const reviews = useAxios(`/${users_url}/get_reviews_of_user`);
  const representReviews = useLoading(reviews, (reviews) => {
    return reviews.map((review: any, index: number) => {
      return <Review review={review} index={index + 1} admin={false} />;
    });
  });
  return (
    <Col className="mx-auto">
      <SubPageTitle title="Past reviews" />

      <Row>{representReviews}</Row>
    </Col>
  );
}

export default Reviews;
