import React from "react";
import { Col, Row } from "react-bootstrap";

type SubPageTitleProps = {
  title: string;
};

function SubPageTitle(props: SubPageTitleProps) {
  return (
    <Row className="mb-2 mt-5 mb-3">
      <Col xs={8} md={4} className="mx-auto">
        <h2 className="text-center subpage-title">{props.title}</h2>
      </Col>
    </Row>
  );
}

export default SubPageTitle;
