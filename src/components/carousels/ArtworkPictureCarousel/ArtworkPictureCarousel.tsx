import React from "react";

import { Card, Carousel, Col, Row } from "react-bootstrap";

import { SERVER_URL } from "@/utils/constants";

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
          <Col className="mx-auto" md={8} sm={9}>
            <Carousel>
              {other_pictures.map((pic, index) => {
                return (
                  <Carousel.Item className="mb-5 px-3" key={`${pic}_${index}`}>
                    <Card border="secondary" className="mx-5 p-2">
                      <Card.Img
                        height="300px"
                        src={`${SERVER_URL}/${pic}`}
                        style={{ objectFit: "contain" }}
                        width="500px"
                      />
                    </Card>
                  </Carousel.Item>
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
