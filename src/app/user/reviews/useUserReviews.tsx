"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { USERS_URL } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider";
import UserReview from "@/components/reviews/UserReview";

import { Review } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

interface UseUserReviewsReturn {
  t: (key: string) => string;
  representReviews: React.ReactElement;
}

function useUserReviews(): UseUserReviewsReturn {
  const { t } = useI18n();
  const reviews = useAxios(`/${USERS_URL}/get_reviews_of_user`) as Review[];
  const representReviews = useLoading(reviews, (reviews) => {
    return (
      <>
        {reviews.length !== 0 ? (
          <>
            {reviews.map((review, index) => (
              <UserReview
                admin={false}
                index={index + 1}
                key={index}
                review={review}
              />
            ))}
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

export default useUserReviews;
