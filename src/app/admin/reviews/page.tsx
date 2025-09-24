"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import useLoading from "@/hooks/useLoading";
import useAxios from "@/hooks/useAxios";
import { admin_url } from "@/utils/apiConstants";
import Review from "@/components/Review";
import SubPageTitle from "@/components/SubPageTitle";
import { Review as ReviewType } from "@/fetching/types";

function Reviews() {
  const reviews = useAxios(`/${admin_url}/unapproved_reviews`) as ReviewType[];
  const representReviews = useLoading(reviews, (reviews) => {
    return (
      <>
        {reviews.length !== 0 ? (
          <>
            {(reviews as ReviewType[]).map(
              (review: ReviewType, index: number) => {
                return (
                  <Review
                    key={index}
                    review={review}
                    index={index + 1}
                    admin={true}
                  />
                );
              }
            )}
          </>
        ) : (
          <Row className="px-3 mx-auto floating-element mb-5">
            <Col className="text-center">--- No reviews ---</Col>
          </Row>
        )}
      </>
    );
  });
  return (
    <Col className="mx-auto">
      <SubPageTitle title="New reviews" />

      <Row>{representReviews}</Row>
    </Col>
  );
}

export default Reviews;
