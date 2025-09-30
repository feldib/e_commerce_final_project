"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { USERS_URL } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider";
import Review from "@/components/Review";
import SubPageTitle from "@/components/SubPageTitle";

import { Review as ReviewType } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

function Reviews() {
  const { t } = useI18n();
  const reviews = useAxios(`/${USERS_URL}/get_reviews_of_user`) as ReviewType[];
  const representReviews = useLoading(reviews, (reviews) => {
    return (
      <>
        {reviews.length !== 0 ? (
          <>
            {reviews.map((review, index) => (
              <Review
                key={index}
                review={review}
                index={index + 1}
                admin={false}
              />
            ))}
          </>
        ) : (
          <Row className="px-3 mx-auto floating-element mb-5">
            <Col className="text-center">
              {t("app.user.reviews.no_reviews")}
            </Col>
          </Row>
        )}
      </>
    );
  });
  return (
    <Col className="mx-auto">
      <SubPageTitle title={t("app.user.reviews.title")} />

      <Row>{representReviews}</Row>
    </Col>
  );
}

export default Reviews;
