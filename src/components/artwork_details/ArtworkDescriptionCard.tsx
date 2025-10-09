"use client";

import React from "react";

import { Card, Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork, Tag } from "@/fetching/types";

import FavouriteButton from "../buttons/FavouriteButton";
import ShoppingCartButton from "../buttons/ShoppingCartButton";

import { createQuantityDecreaseHandler } from "@/helpers/shoppingCartHelpers";
import { useCategories } from "@/hooks/useCategories";

type ArtworkDescriptionCardProps = {
  artwork_id: number;
  artwork: Artwork;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

function ArtworkDescriptionCard({
  artwork_id,
  artwork,
  quantity,
  setQuantity,
}: ArtworkDescriptionCardProps) {
  const { t, locale } = useI18n();
  const { getCategoryNameById } = useCategories(locale);

  const handleQuantityDecrease = createQuantityDecreaseHandler(
    quantity,
    setQuantity
  );

  return (
    <Col className="mb-3" md={8}>
      <Card border="secondary" className="mx-auto">
        <Card.Body className="p-3 px-3">
          <Row>
            <Col>
              <Card.Title className="mb-4">
                <h3>{t("common.description")}</h3>
              </Card.Title>

              <Card.Subtitle>
                <p>{artwork.description}</p>
              </Card.Subtitle>
            </Col>

            <Col className="text-center px-3" xs={1}>
              <button onClick={handleQuantityDecrease}>
                <ShoppingCartButton
                  artwork_id={artwork_id}
                  quantity={quantity}
                />
              </button>

              <FavouriteButton artwork_id={artwork_id} />
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
                  {t("common.available_quantity")}:{" "}
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
                  {t("common.price")}: €
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
