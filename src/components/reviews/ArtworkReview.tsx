"use client";
import React from "react";

import { Card, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { Review } from "@/fetching/types";

type ArtworkReviewProps = {
  review: Review;
  index: number;
};

function ArtworkReview({ review, index }: ArtworkReviewProps) {
  const { t } = useI18n();
  return (
    <>
      <Row className="mx-auto mb-5" key={index}>
        <Card className="p-3 floating-element">
          <Card.Title>
            <p>
              {t("components.review.title_label")} {review.title}
            </p>
          </Card.Title>

          <Card.Subtitle className="mb-2 custom-muted">
            {t("common.by")}
            {review.name}
          </Card.Subtitle>

          <Card.Text className="mb-2">{review.review_text}</Card.Text>
        </Card>
      </Row>
    </>
  );
}

export default ArtworkReview;
