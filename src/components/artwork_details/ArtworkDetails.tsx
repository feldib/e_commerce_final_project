"use client";

import React from "react";

import { Col, Row } from "react-bootstrap";

import { Artwork } from "@/fetching/types";

import ArtworkPictureCarousel from "../carousels/ArtworkPictureCarousel";
import LeaveReview from "../reviews/LeaveReview";
import ArtworkDescriptionCard from "./ArtworkDescriptionCard";
import ArtworkInfoCard from "./ArtworkInfoCard";
import useArtworkDetails from "./hooks/useArtworkDetails";

type ArtworkDetailsProps = {
  artwork_id: number;
  artwork: Artwork;
};

function ArtworkDetails({ artwork_id, artwork }: ArtworkDetailsProps) {
  const { t, quantity, setQuantity, representReviews } = useArtworkDetails({
    artwork_id,
    artwork,
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
