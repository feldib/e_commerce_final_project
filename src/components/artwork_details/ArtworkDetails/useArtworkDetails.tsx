"use client";

import React from "react";

import { Col, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";
import ArtworkReview from "@/components/reviews/ArtworkReview/ArtworkReview";

import { Artwork, Review } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";
import useQuantity from "@/hooks/useQuantity";

type UseArtworkDetailsProps = {
  artwork_id: number;
  artwork: Artwork;
};

type UseArtworkDetailsReturn = {
  t: (key: string) => string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  representReviews: React.ReactNode;
};

function useArtworkDetails({
  artwork_id,
  artwork,
}: UseArtworkDetailsProps): UseArtworkDetailsReturn {
  const { t } = useI18n();
  const { loggedIn } = React.useContext(UserDataContext);
  const reviewsData = useAxios(`/reviews?id=${artwork_id}`) as Review[];

  const { quantity, setQuantity } = useQuantity(
    loggedIn,
    artwork.quantity,
    artwork_id
  );

  const representReviews = useLoading(reviewsData, (reviews) => {
    return (
      <>
        {reviews.length !== 0 ? (
          <>
            {reviews.map((review, index) => (
              <ArtworkReview index={index + 1} key={index} review={review} />
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
    quantity,
    setQuantity,
    representReviews,
  };
}

export default useArtworkDetails;
