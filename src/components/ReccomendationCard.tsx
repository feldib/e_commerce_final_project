"use client";
import React from "react";
import { server_url } from "../utils/api_constants";
import { Col, Row, Card } from "react-bootstrap";
import FavouriteButton from "./buttons/FavouriteButton";
import ShoppingCartButton from "./buttons/ShoppingCartButton";
import Link from "next/link";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import useQuantity from "../hooks/useQuantity";
import { Artwork } from "@/fetching/types";

type ReccomendationCardProps = {
  artwork: Artwork;
};

function ReccomendationCard({ artwork }: ReccomendationCardProps) {
  const { loggedIn } = React.useContext(UserDataContext);

  const { quantity, setQuantity } = useQuantity(
    loggedIn,
    artwork.quantity,
    artwork.id
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
              <h6>{`by ${artwork.artist_name}`}</h6>
            </Card.Subtitle>
          </Col>

          <Col xs={1} className="text-center px-3">
            <span
              className="reccommendation-button"
              onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <ShoppingCartButton artwork_id={artwork.id} quantity={quantity} />
            </span>

            <span className="reccommendation-button">
              <FavouriteButton artwork_id={artwork.id} />
            </span>
          </Col>
        </Row>
      </Card.Body>

      <Card.Img
        src={`${server_url}/${artwork.thumbnail}`}
        width="500"
        height="300"
        style={{ objectFit: "cover" }}
        alt="place of thumbnail"
        variant="bottom"
      />
    </Card>
  );
}

export default ReccomendationCard;
