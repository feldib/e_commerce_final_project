"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { ADMIN_URL } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import UserReview from "@/components/reviews/UserReview/UserReview";

import { Review } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

type UseReviewsReturn = {
  t: (key: string) => string;
  representReviews: React.ReactNode;
};

function useReviews(): UseReviewsReturn {
  const { t } = useI18n();
  const reviews = useAxios(`/${ADMIN_URL}/unapproved_reviews`) as Review[];

  const representReviews = useLoading(reviews, (reviews) => {
    return (
      <>
        {reviews.length !== 0 ? (
          <>
            {(reviews as Review[]).map((review: Review, index: number) => {
              return (
                <UserReview
                  admin={true}
                  index={index + 1}
                  key={index}
                  review={review}
                />
              );
            })}
          </>
        ) : (
          <Row className="px-3 mx-auto floating-element mb-5">
            <Col className="text-center">
              {t("common.no_result.no_reviews")}
            </Col>
          </Row>
        )}
      </>
    );
  });

  return {
    t,
    representReviews,
  };
}

export default useReviews;
