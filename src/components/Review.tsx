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

function Review({ review, admin, index }: ReviewProps) {
  const [showReview, setShowReview] = React.useState(true);
  return (
    <>
      {showReview && (
        <Row className="mx-auto mb-5" key={index}>
          <Card className="p-3 floating-element">
            <Card.Title>
              <p>Title: {review.title}</p>
            </Card.Title>

            {admin ? (
              <Card.Subtitle>
                <p>User: {review.name}</p>
              </Card.Subtitle>
            ) : (
              <Card.Subtitle>
                <p>{review.approved ? "Approved" : "Awaits evaluation"}</p>
              </Card.Subtitle>
            )}

            <Card.Subtitle>
              <p>
                Item:{" "}
                <Link href={`/artwork_page/${review.artwork_id}`}>
                  {review.artwork_title}
                </Link>{" "}
                by {review.artist_name}
              </p>
            </Card.Subtitle>

            <Row>
              <p>{review.review_text}</p>
            </Row>

            {admin && (
              <Row>
                <Col>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      approveReview(review.id);
                      setShowReview(false);
                    }}
                  />
                </Col>

                <Col>
                  <FontAwesomeIcon
                    icon={faX}
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => {
                      disapproveReview(review.id);
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
