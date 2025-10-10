import React from "react";

import { Col, Row } from "react-bootstrap";

type SubPageTitleProps = {
  title: string;
};

function SubPageTitle({ title }: SubPageTitleProps) {
  return (
    <Row className="mb-2 mt-5 mb-3">
      <Col className="mx-auto" md={4} xs={8}>
        <h2 className="text-center subpage-title">{title}</h2>
      </Col>
    </Row>
  );
}

export default SubPageTitle;
