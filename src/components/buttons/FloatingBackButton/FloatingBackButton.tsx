import React from "react";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col } from "react-bootstrap";

function FloatingBackButton({ router }: { router: AppRouterInstance }) {
  const handleBackClick = () => {
    router.back();
  };

  return (
    <Col
      className="position-fixed fixed-bottom text-center mb-4 mx-auto"
      style={{ width: "20px" }}
    >
      <Button
        className="mb-5 floating-back-button"
        onClick={handleBackClick}
        variant="primary"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
    </Col>
  );
}

export default FloatingBackButton;
