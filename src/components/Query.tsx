import React from "react";

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";

type QueryProps = {
  text: string;
  remove: () => void;
};

function Query({ text, remove }: QueryProps) {
  return (
    <Col className="mb-3" md={6} sm={6} xs={12}>
      <p>
        <FontAwesomeIcon
          icon={faFilter}
          style={{
            color: "red",
            border: "2px solid red",
            borderRadius: "10px",
            padding: "2px",
          }}
        />
        <span
          style={{
            margin: "10px",
            fontSize: "1.4rem",
          }}
        >
          {text}
        </span>
        <span className="mx-1" onClick={remove} style={{ cursor: "pointer" }}>
          ❌
        </span>
      </p>
    </Col>
  );
}

export default Query;
