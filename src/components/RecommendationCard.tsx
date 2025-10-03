"use client";
import React from "react";

import Link from "next/link";

import { Card, Col, Row } from "react-bootstrap";

import { SERVER_URL, UI_DIMENSIONS } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { Artwork } from "@/fetching/types";

import FavouriteButton from "./buttons/FavouriteButton";
import ShoppingCartButton from "./buttons/ShoppingCartButton";

import useQuantity from "@/hooks/useQuantity";

type RecommendationCardProps = {
  artwork: Artwork;
};

function RecommendationCard({ artwork }: RecommendationCardProps) {
  const { t } = useI18n();
  const { loggedIn } = React.useContext(UserDataContext);

  const { quantity, setQuantity } = useQuantity(
    loggedIn,
    artwork.quantity,
    artwork.id,
  );

  return (
    <Card className="mx-auto" border="secondary">
      <Card.Body className="p-3">
        <Row>
          <Col>
            <Card.Title>
              <Link href={`/artwork_page/${artwork.id}`}>
                <h3>{artwork.title}</h3>
              </Link>
            </Card.Title>

            <Card.Subtitle>
              <h6>{`${t("common.by")}${artwork.artist_name}`}</h6>
            </Card.Subtitle>
          </Col>

          <Col xs={1} className="text-center px-3">
            <span
              className="recommendation-button"
              onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <ShoppingCartButton artwork_id={artwork.id} quantity={quantity} />
            </span>

            <span className="recommendation-button">
              <FavouriteButton artwork_id={artwork.id} />
            </span>
          </Col>
        </Row>
      </Card.Body>

      <Card.Img
        src={`${SERVER_URL}/${artwork.thumbnail}`}
        width={UI_DIMENSIONS.CARD_IMAGE_WIDTH}
        height="300"
        style={{ objectFit: "cover" }}
        alt={t("common.place_of_thumbnail")}
        variant="bottom"
      />
    </Card>
  );
}

export default RecommendationCard;
