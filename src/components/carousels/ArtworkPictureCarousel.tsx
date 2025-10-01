import React from "react";

import { Carousel, Col, Row } from "react-bootstrap";

import ArtworkPictureCarouselItem from "./ArtworkPictureCarouselItem";

type ArtworkPictureCarouselProps = {
  other_pictures: string[];
};

function ArtworkPictureCarousel({
  other_pictures,
}: ArtworkPictureCarouselProps) {
  return (
    <>
      {other_pictures.length > 0 && (
        <Row>
          <Col sm={9} md={8} className="mx-auto">
            <Carousel>
              {other_pictures.map((pic, index) => {
                return (
                  <ArtworkPictureCarouselItem
                    imageUrl={pic}
                    key={`${pic}_${index}`}
                  />
                );
              })}
            </Carousel>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ArtworkPictureCarousel;
