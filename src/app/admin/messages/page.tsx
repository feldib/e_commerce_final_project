"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import SubPageTitle from "@/components/layout/SubPageTitle/SubPageTitle";

import useMessages from "./useMessages";

function Messages() {
  const { t, messagesRepresented } = useMessages();

  return (
    <Col className="mx-3">
      <SubPageTitle title={t("app.admin.messages.title")} />
      <Row>{messagesRepresented}</Row>
    </Col>
  );
}

export default Messages;
