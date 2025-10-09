"use client";
import React from "react";

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

type QueryProps = {
  text: string;
  remove: () => void;
};

function Query({ text, remove }: QueryProps) {
  const { t } = useI18n();

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
        <button
          aria-label={t("components.query.aria_label_remove_filter")}
          className="mx-1"
          onClick={remove}
        >
          ❌
        </button>
      </p>
    </Col>
  );
}

export default Query;
