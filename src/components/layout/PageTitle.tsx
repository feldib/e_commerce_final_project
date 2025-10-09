import React from "react";

import { Col, Row } from "react-bootstrap";

function PageTitle({ title }: { title: string }) {
  return (
    <Row className="mb-2 mt-3 mb-3">
      <Col className="mx-auto mb-2 mt-3 mb-3" md={6} xs={8}>
        <h1 className="text-center page-title text-decoration-underline">
          {title}
        </h1>
      </Col>
    </Row>
  );
}

export default PageTitle;
