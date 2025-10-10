"use client";

import React from "react";

import { Card, Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { Artwork, Tag } from "@/fetching/types";

import FavouriteButton from "../../buttons/FavouriteButton/FavouriteButton";
import ShoppingCartButton from "../../buttons/ShoppingCartButton/ShoppingCartButton";
import useArtworkDescriptionCard from "./useArtworkDescriptionCard";

type ArtworkDescriptionCardProps = {
  artwork: Artwork;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

function ArtworkDescriptionCard({
  artwork,
  quantity,
  setQuantity,
}: ArtworkDescriptionCardProps) {
  const { getCategoryNameById, handleQuantityDecrease, t } =
    useArtworkDescriptionCard({ quantity, setQuantity });

  return (
    <Col className="mb-3" md={8}>
      <Card border="secondary" className="mx-auto">
        <Card.Body className="p-3 px-3">
          <Row>
            <Col>
              <Card.Title className="mb-4">
                <h3>{t("common.fields.description")}</h3>
              </Card.Title>

              <Card.Subtitle>
                <p>{artwork.description}</p>
              </Card.Subtitle>
            </Col>

            <Col className="text-center px-3" xs={1}>
              <button onClick={handleQuantityDecrease}>
                <ShoppingCartButton
                  artwork_id={artwork.id}
                  quantity={quantity}
                />
              </button>

              <FavouriteButton artwork_id={artwork.id} />
              <ToastContainer position="bottom-right" />
            </Col>
          </Row>

          <Row>
            <Col>
              <Row>
                <p>
                  <strong>{getCategoryNameById(artwork.category_id)}</strong>
                </p>
              </Row>
            </Col>

            <Col>
              <Row>
                <p>
                  {artwork.tags
                    ?.map((tag: Tag) => {
                      return tag.tname;
                    })
                    .join(", ")}
                </p>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
              <Row>
                <p>
                  {t("common.shop.available_quantity")}:{" "}
                  {artwork ? (
                    quantity
                  ) : (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status" />
                    </div>
                  )}
                </p>
              </Row>

              <Row>
                <p>
                  {t("common.fields.price")}: €
                  {artwork ? (
                    artwork.price
                  ) : (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status" />
                    </div>
                  )}
                </p>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ArtworkDescriptionCard;
