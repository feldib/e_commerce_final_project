"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import SubPageTitle from "../../../components/SubPageTitle";
import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";
import { admin_url } from "../../../utils/api_constants";
import UnansweredMessage from "../../../components/UnansweredMessage";
import { Message } from "../../../fetching/types";

function Messages() {
  const messages = useAxios(`/${admin_url}/unanswered_messages`);
  const messagesRepresented = useLoading(messages, (messages) => {
    return (
      <>
        {(messages as Message[]).map((message: Message, index: number) => {
          return <UnansweredMessage key={index} message={message} />;
        })}
      </>
    );
  });
  return (
    <Col className="mx-3">
      <SubPageTitle title="Unanswered messages" />

      <Row>{messagesRepresented}</Row>
    </Col>
  );
}

export default Messages;
