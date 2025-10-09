"use client";

import React from "react";

import { Col, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { Artwork, Review } from "@/fetching/types";

import ArtworkPictureCarousel from "../carousels/ArtworkPictureCarousel";
import ArtworkReview from "../reviews/ArtworkReview";
import LeaveReview from "../reviews/LeaveReview";
import ArtworkDescriptionCard from "./ArtworkDescriptionCard";
import ArtworkInfoCard from "./ArtworkInfoCard";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";
import useQuantity from "@/hooks/useQuantity";

type ArtworkDetailsProps = {
  artwork_id: number;
  artwork: Artwork;
};

function ArtworkDetails({ artwork_id, artwork }: ArtworkDetailsProps) {
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

  return (
    <>
      <Row className="mb-5 mt-5">
        <ArtworkInfoCard
          artwork={artwork}
          quantity={quantity}
          setQuantity={setQuantity}
        />

        <ArtworkDescriptionCard
          artwork={artwork}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </Row>

      <ArtworkPictureCarousel other_pictures={artwork.other_pictures ?? []} />

      <Row className="mt-5">
        <Row className="text-center">
          <Col className="mx-auto" md={4} xs={5}>
            <h4 className="subpage-title">{t("common.fields.reviews")}</h4>
          </Col>
        </Row>

        <Row className="mt-5">{representReviews}</Row>
      </Row>

      <LeaveReview artwork_id={artwork_id} />
    </>
  );
}

export default ArtworkDetails;
