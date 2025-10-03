"use client";
import React from "react";

import Link from "next/link";

import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { approveReview, disapproveReview } from "@/fetching/fetching";
import { Review } from "@/fetching/types";

type UserReviewProps = {
  review: Review;
  admin: boolean;
  index: number;
};

function UserReview({ review, admin, index }: UserReviewProps) {
  const { t } = useI18n();
  const [showReview, setShowReview] = React.useState(true);
  return (
    <>
      {showReview && (
        <Row className="mx-auto mb-5" key={index}>
          <Card className="p-3 floating-element">
            <Card.Title>
              <p>
                {t("components.review.title_label")} {review.title}
              </p>
            </Card.Title>

            {admin ? (
              <Card.Subtitle>
                <p>
                  {t("components.review.user_label")} {review.name}
                </p>
              </Card.Subtitle>
            ) : (
              <Card.Subtitle>
                <p>
                  {review.approved
                    ? t("components.review.approved")
                    : t("components.review.awaits_evaluation")}
                </p>
              </Card.Subtitle>
            )}

            <Card.Subtitle>
              <p>
                {t("components.review.item_label")}{" "}
                <Link href={`/artwork_page/${review.artwork_id}`}>
                  {review.artwork_title}
                </Link>{" "}
                {t("components.review.by")}
                {review.artist_name}
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

export default UserReview;
