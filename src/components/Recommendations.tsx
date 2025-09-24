"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel,Col, Row } from "react-bootstrap";

import { Artwork } from "@/fetching/types";

import RecommendationCard from "./RecommendationCard";

import useAxios from "@/hooks/useAxios";

type RecommendationsProps = {
  title: string;
  path: string;
};

function Recommendations({ title, path }: RecommendationsProps) {
  const [tableHidden, setTableHidden] = React.useState(false);
  const recommendations = useAxios(`${path}?n=10`) as Artwork[];

  const isMd = useMediaQuery({ minWidth: "768px" });

  return (
    <>
      {recommendations && recommendations.length > 0 && (
        <Col xs={12} lg={5} className="mb-3 mx-auto">
          <Row>
            <Col xs={7} md={5} lg={7} className="mx-auto">
              <h4 className="text-center recommendation-title">
                {`${title}`}
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
            <Carousel pause="hover" className="recommendation-carousel">
              {recommendations.map((artwork: Artwork, index: number) => {
                return (
                  <Carousel.Item
                    key={index}
                    interval={3000}
                    className="mb-5 px-none"
                  >
                    <RecommendationCard artwork={artwork} />
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

export default Recommendations;
