import { Review } from "@/fetching/types";
import React from "react";
import { Card, Carousel } from "react-bootstrap";

type ReviewsOfArtworksProps = {
  reviews: Review[];
};

function ReviewsOfArtworks(props: ReviewsOfArtworksProps) {
  return (
    <>
      {props.reviews.length ? (
        <Carousel>
          {props.reviews.map((review, index) => {
            return (
              <Carousel.Item className="mb-5 px-5" key={index}>
                <Card className="mx-5 p-3" border="secondary">
                  <Card.Title className="mb-2">{review.title}</Card.Title>

                  <Card.Subtitle className="mb-2 custom-muted">
                    by {review.name}
                  </Card.Subtitle>

                  <Card.Text className="mb-2">{review.review_text}</Card.Text>
                </Card>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <p className="text-center floating-element">---- No reviews ----</p>
      )}
    </>
  );
}

export default ReviewsOfArtworks;
