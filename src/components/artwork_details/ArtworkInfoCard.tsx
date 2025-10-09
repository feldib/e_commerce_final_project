"use client";

import React from "react";

import { Card, Col } from "react-bootstrap";

import { SERVER_URL } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork } from "@/fetching/types";

import FavouriteButton from "../buttons/FavouriteButton";
import ShoppingCartButton from "../buttons/ShoppingCartButton";

import { createQuantityDecreaseHandler } from "@/helpers/shoppingCartHelpers";

type ArtworkInfoCardProps = {
  artwork: Artwork;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

function ArtworkInfoCard({
  artwork,
  quantity,
  setQuantity,
}: ArtworkInfoCardProps) {
  const { t } = useI18n();

  const handleQuantityDecrease = createQuantityDecreaseHandler(
    quantity,
    setQuantity
  );

  return (
    <Col className="mb-3" md={4} sm={12}>
      <Card border="secondary" className="mx-auto">
        <Card.Body className="p-3">
          <div className="row">
            <div className="col">
              <Card.Title>
                <h3>{artwork.title}</h3>
              </Card.Title>

              <Card.Subtitle>
                <h6>{`${t("common.fields.by")}${artwork.artist_name}`}</h6>
              </Card.Subtitle>
            </div>

            <div className="col text-center px-3" style={{ maxWidth: "auto" }}>
              <button onClick={handleQuantityDecrease}>
                <ShoppingCartButton
                  artwork_id={artwork.id}
                  quantity={quantity}
                />
              </button>

              <FavouriteButton artwork_id={artwork.id} />
            </div>
          </div>
        </Card.Body>

        <Card.Img src={`${SERVER_URL}/${artwork.thumbnail}`} variant="bottom" />
      </Card>
    </Col>
  );
}

export default ArtworkInfoCard;
