"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { ADMIN_URL } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider";
import Review from "@/components/Review";
import SubPageTitle from "@/components/SubPageTitle";

import { Review as ReviewType } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

function Reviews() {
  const { t } = useI18n();
  const reviews = useAxios(`/${ADMIN_URL}/unapproved_reviews`) as ReviewType[];
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
            <Col className="text-center">
              {t("app.admin.reviews.no_reviews")}
            </Col>
          </Row>
        )}
      </>
    );
  });
  return (
    <Col className="mx-auto">
      <SubPageTitle title={t("app.admin.reviews.new_reviews")} />

      <Row>{representReviews}</Row>
    </Col>
  );
}

export default Reviews;
