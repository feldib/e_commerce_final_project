"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import SubPageTitle from "@/components/SubPageTitle";
import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";
import { admin_url } from "@/utils/api_constants";
import UnansweredMessage from "@/components/UnansweredMessage";
import { Message } from "@/fetching/types";

function Messages() {
  const messages = useAxios(`/${admin_url}/unanswered_messages`) as Message[];
  const messagesRepresented = useLoading(messages, (messages) => {
    return (
      <>
        {messages.length !== 0 ? (
          <>
            {messages.map((message: Message, index: number) => {
              return <UnansweredMessage key={index} message={message} />;
            })}
          </>
        ) : (
          <Row className="px-3 mx-auto floating-element mb-5">
            <Col className="text-center">--- No messages ---</Col>
          </Row>
        )}
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
