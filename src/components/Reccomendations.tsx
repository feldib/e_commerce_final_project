"use client";
import React from "react";
import useAxios from "../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Carousel } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import ReccomendationCard from "./ReccomendationCard";
import { Artwork } from "@/fetching/types";

type ReccomendationsProps = {
  title: string;
  path: string;
};

function Reccomendations(props: ReccomendationsProps) {
  const [tableHidden, setTableHidden] = React.useState(false);
  const recommendations = useAxios(`${props.path}?n=10`) as any[];

  const isMd = useMediaQuery({ minWidth: "768px" });

  return (
    <>
      {recommendations && recommendations.length > 0 && (
        <Col xs={12} lg={5} className="mb-3 mx-auto">
          <Row>
            <Col xs={7} md={5} lg={7} className="mx-auto">
              <h4 className="text-center reccomendation-title">
                {`${props.title}`}
                <FontAwesomeIcon
                  className="toggle-reccommendation mx-2 d-md-none"
                  icon={!tableHidden ? faCaretDown : faCaretUp}
                  onClick={() => {
                    setTableHidden(!tableHidden);
                  }}
                />
              </h4>
            </Col>
          </Row>

          {(!tableHidden || isMd) && recommendations && (
            <Carousel>
              {recommendations.map((artwork: Artwork, index: number) => {
                return (
                  <Carousel.Item
                    key={index}
                    interval={3000}
                    className="mb-5 px-none"
                  >
                    <ReccomendationCard artwork={artwork} />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          )}
        </Col>
      )}
    </>
  );
}

export default Reccomendations;
