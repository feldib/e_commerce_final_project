import React from "react";
import { Col, Row, Carousel, Card } from "react-bootstrap";
import { server_url } from "../utils/api_constants";
import { string } from "yup";

type ArtworkPicturesCarouselProps = {
  other_pictures: string[];
};

function ArtworkPicturesCarousel(props: ArtworkPicturesCarouselProps) {
  return (
    <>
      {props.other_pictures.length > 0 && (
        <Row>
          <Col sm={9} md={8} className="mx-auto">
            <Carousel>
              {props.other_pictures.map((pic, index) => {
                return (
                  <Carousel.Item className="mb-5 px-3" key={index}>
                    <Card className="mx-5 p-2" border="secondary">
                      <Card.Img
                        src={`${server_url}/${pic}`}
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
