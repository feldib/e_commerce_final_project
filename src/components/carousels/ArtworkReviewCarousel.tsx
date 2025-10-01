"use client";

import React from "react";

import { Carousel } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { Review } from "@/fetching/types";

import ArtworkReviewCarouselItem from "./ArtworkReviewCarouselItem";

type ArtworkReviewCarouselProps = {
  reviews: Review[];
};

function ArtworkReviewCarousel({ reviews }: ArtworkReviewCarouselProps) {
  const { t } = useI18n();

  return (
    <>
      {reviews.length ? (
        <Carousel>
          {reviews.map((review) => {
            return (
              <ArtworkReviewCarouselItem review={review} key={review.id} />
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

export default ArtworkReviewCarousel;
