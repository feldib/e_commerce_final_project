"use client";
import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { approveReview, disapproveReview } from "@/fetching/fetching";
import Link from "next/link";
import { Review as ReviewType } from "@/fetching/types";

type ReviewProps = {
  review: ReviewType;
  admin: boolean;
  index: number;
};

function Review(props: ReviewProps) {
  const [showReview, setShowReview] = React.useState(true);
  return (
    <>
      {showReview && (
        <Row className="mx-auto mb-5" key={props.index}>
          <Card className="p-3 floating-element">
            <Card.Title>
              <p>Title: {props.review.title}</p>
            </Card.Title>

            {props.admin ? (
              <Card.Subtitle>
                <p>User: {props.review.name}</p>
              </Card.Subtitle>
            ) : (
              <Card.Subtitle>
                <p>
                  {props.review.approved ? "Approved" : "Awaits evaluation"}
                </p>
              </Card.Subtitle>
            )}

            <Card.Subtitle>
              <p>
                Item:{" "}
                <Link href={`/artwork_page/${props.review.artwork_id}`}>
                  {props.review.artwork_title}
                </Link>{" "}
                by {props.review.artist_name}
              </p>
            </Card.Subtitle>

            <Row>
              <p>{props.review.review_text}</p>
            </Row>

            {props.admin && (
              <Row>
                <Col>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      approveReview(props.review.id);
                      setShowReview(false);
                    }}
                  />
                </Col>

                <Col>
                  <FontAwesomeIcon
                    icon={faX}
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => {
                      disapproveReview(props.review.id);
                      setShowReview(false);
                    }}
                  />
                </Col>
              </Row>
            )}
          </Card>
        </Row>
      )}
    </>
  );
}

export default Review;
