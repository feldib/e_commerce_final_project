import React from "react";

import { Card, Carousel, Col, Row } from "react-bootstrap";

import { SERVER_URL } from "@/utils/apiConstants";

type ArtworkPicturesCarouselProps = {
  other_pictures: string[];
};

function ArtworkPicturesCarousel({
  other_pictures,
}: ArtworkPicturesCarouselProps) {
  return (
    <>
      {other_pictures.length > 0 && (
        <Row>
          <Col sm={9} md={8} className="mx-auto">
            <Carousel>
              {other_pictures.map((pic, index) => {
                return (
                  <Carousel.Item className="mb-5 px-3" key={index}>
                    <Card className="mx-5 p-2" border="secondary">
                      <Card.Img
                        src={`${SERVER_URL}/${pic}`}
                        width="500px"
                        height="300px"
                        style={{ objectFit: "contain" }}
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

export default ArtworkPicturesCarousel;
