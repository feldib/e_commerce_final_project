"use client";

import React from "react";

import { Card, Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { SERVER_URL } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { Artwork, Review, Tag } from "@/fetching/types";

import ArtworkPicturesCarousel from "./ArtworkPicturesCarousel";
import FavouriteButton from "./buttons/FavouriteButton";
import ShoppingCartButton from "./buttons/ShoppingCartButton";
import LeaveReview from "./LeaveReview";
import ReviewsOfArtworks from "./ReviewsOfArtwork";

import useAxios from "@/hooks/useAxios";
import { useCategories } from "@/hooks/useCategories";
import useLoading from "@/hooks/useLoading";
import useQuantity from "@/hooks/useQuantity";

type ArtworkDetailsProps = {
  artwork_id: number;
  artwork: Artwork;
};

function ArtworkDetails({ artwork_id, artwork }: ArtworkDetailsProps) {
  const { t, locale } = useI18n();
  const { getCategoryNameById } = useCategories(locale);
  const { loggedIn } = React.useContext(UserDataContext);
  const reviewsData = useAxios(`/reviews?id=${artwork_id}`) as Review[];

  const { quantity, setQuantity } = useQuantity(
    loggedIn,
    artwork.quantity,
    artwork_id
  );

  const reviews = useLoading(reviewsData, (reviews) => {
    return <ReviewsOfArtworks reviews={reviews} />;
  });

  return (
    <>
      <Row className="mb-5 mt-5">
        <Col sm={12} md={4} className="mb-3">
          <Card className="mx-auto" border="secondary">
            <Card.Body className="p-3">
              <Row>
                <Col>
                  <Card.Title>
                    <h3>{artwork.title}</h3>
                  </Card.Title>

                  <Card.Subtitle>
                    <h6>{`${t("common.by")} ${artwork.artist_name}`}</h6>
                  </Card.Subtitle>
                </Col>

                <Col xs={1} className="text-center px-3">
                  <span
                    onClick={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <ShoppingCartButton
                      artwork_id={artwork_id}
                      quantity={quantity}
                    />
                  </span>

                  <FavouriteButton artwork_id={artwork_id} />
                </Col>
              </Row>
            </Card.Body>

            <Card.Img
              src={`${SERVER_URL}/${artwork.thumbnail}`}
              variant="bottom"
            />
          </Card>
        </Col>

        <Col md={8} className="mb-3">
          <Card className="mx-auto" border="secondary">
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

                <Col xs={1} className="text-center px-3">
                  <span
                    onClick={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <ShoppingCartButton
                      artwork_id={artwork_id}
                      quantity={quantity}
                    />
                  </span>

                  <FavouriteButton artwork_id={artwork_id} />
                  <ToastContainer position="bottom-right" />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Row>
                    <p>
                      <strong>
                        {getCategoryNameById(artwork.category_id)}
                      </strong>
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
      </Row>

      <ArtworkPicturesCarousel other_pictures={artwork.other_pictures ?? []} />

      <Row className="mt-5">
        <Row className="text-center">
          <Col xs={5} md={4} className="mx-auto">
            <h4 className="subpage-title">{t("common.reviews")}</h4>
          </Col>
        </Row>

        <Row>{reviews}</Row>
      </Row>

      <LeaveReview artwork_id={artwork_id} />
    </>
  );
}

export default ArtworkDetails;
