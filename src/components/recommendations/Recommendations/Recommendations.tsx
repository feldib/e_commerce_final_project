"use client";
import React from "react";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel, Col, Row } from "react-bootstrap";

import { UI_DIMENSIONS } from "@/utils/constants";

import { Artwork } from "@/fetching/types";

import RecommendationCard from "../RecommendationCard/RecommendationCard";
import useRecommendations from "./useRecommendations";

type RecommendationsProps = {
  title: string;
  path: string;
};

function Recommendations({ title, path }: RecommendationsProps) {
  const { handleToggleRecommendations, isMd, recommendations, tableHidden } =
    useRecommendations({ path });

  return (
    <>
      {recommendations && recommendations.length > 0 && (
        <Col className="mb-3 mx-auto" lg={5} xs={12}>
          <Row>
            <Col className="mx-auto" lg={7} md={5} xs={7}>
              <h4 className="text-center recommendation-title">
                {`${title}`}
                <FontAwesomeIcon
                  className="toggle-reccommendation mx-2 d-md-none"
                  icon={!tableHidden ? faCaretDown : faCaretUp}
                  onClick={handleToggleRecommendations}
                />
              </h4>
            </Col>
          </Row>

          {(!tableHidden || isMd) && recommendations && (
            <Carousel className="recommendation-carousel" pause="hover">
              {recommendations.map((artwork: Artwork, index: number) => {
                return (
                  <Carousel.Item
                    className="mb-5 px-none"
                    interval={UI_DIMENSIONS.CAROUSEL_INTERVAL}
                    key={index}
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
