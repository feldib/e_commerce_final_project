"use client";

import React from "react";

import { Card, Carousel } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { Review } from "@/fetching/types";

type ReviewsOfArtworksProps = {
  reviews: Review[];
};

function ReviewsOfArtworks({ reviews }: ReviewsOfArtworksProps) {
  const { t } = useI18n();

  return (
    <>
      {reviews.length ? (
        <Carousel>
          {reviews.map((review, index) => {
            return (
              <Carousel.Item className="mb-5 px-5" key={index}>
                <Card className="mx-5 p-3" border="secondary">
                  <Card.Title className="mb-2">{review.title}</Card.Title>

                  <Card.Subtitle className="mb-2 custom-muted">
                    {t("common.by")} {review.name}
                  </Card.Subtitle>

                  <Card.Text className="mb-2">{review.review_text}</Card.Text>
                </Card>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <p className="text-center floating-element">
          {t("components.reviews.no_reviews")}
        </p>
      )}
    </>
  );
}

export default ReviewsOfArtworks;
