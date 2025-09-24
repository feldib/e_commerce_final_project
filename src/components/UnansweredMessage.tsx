"use client";
import React from "react";

import { faAsterisk, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  FloatingLabel,
  Form as RBForm,
  Row,
} from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";

import {
  showIncorrectDataToast,
  showReplyErrorToast,
  showReplySuccessToast,
} from "@/utils/toastUtils";

import { replyToMessage } from "@/fetching/fetching";

import InputComponent from "./input/InputComponent";

type UnansweredMessageProps = {
  message: {
    id: number;
    email: string;
    message_title: string;
    message_txt: string;
  };
};

type ReplyToMessageProps = {
  reply_title: string;
  reply_text: string;
};

function UnansweredMessage({ message }: UnansweredMessageProps) {
  const [replying, setReplying] = React.useState(false);
  const [replied, setReplied] = React.useState(false);

  const initialValues: ReplyToMessageProps = {
    reply_title: "",
    reply_text: "",
  };

  const onSubmit = async (values: ReplyToMessageProps) => {
    try {
      await replyToMessage(
        message.id,
        message.email,
        values.reply_title,
        values.reply_text
      );
      showReplySuccessToast();
      setReplied(true);
    } catch {
      showReplyErrorToast();
    }
  };

  const resetPasswordSchema = Yup.object().shape({
    reply_title: Yup.string().required("Title required"),
    reply_text: Yup.string().required("Reply required"),
  });

  return (
    <Row className="mx-auto mb-5 floating-element p-3">
      {replied ? (
        <Col>
          <h4>Reply sent successfully!</h4>
        </Col>
      ) : (
        <Col>
          <Row>
            <h4 className="text-center">{message.message_title}</h4>
          </Row>

          <Row>
            <h5 className="text-center">{message.email}</h5>
          </Row>

          <Row>
            <p>{message.message_txt}</p>
          </Row>

          <Row>
            <Col>
              {!replying ? (
                <Button
                  type="submit"
                  variant="primary"
                  onClick={() => {
                    setReplying(true);
                  }}
                >
                  Reply
                </Button>
              ) : (
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={resetPasswordSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <InputComponent
                        label="Title"
                        name="reply_title"
                        type="textarea"
                        placeholder="Enter title"
                        icon={faKeyboard}
                        showAsterisk={
                          !!errors.reply_title && !!touched.reply_title
                        }
                      />

                      <RBForm.Group className="mb-3">
                        <RBForm.Label>Message</RBForm.Label>
                        {errors.reply_text && touched.reply_text && (
                          <FontAwesomeIcon
                            icon={faAsterisk}
                            style={{ color: "red" }}
                            className="mx-3"
                          />
                        )}
                        <FloatingLabel label="">
                          <Field
                            className="form-control"
                            type="text"
                            name="reply_text"
                            as="textarea"
                            placeholder="Enter reply"
                            style={{ height: "100px" }}
                          />
                        </FloatingLabel>
                        <ErrorMessage
                          component="div"
                          className="input-error-message"
                          name="reply_text"
                        />
                      </RBForm.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => {
                          if (Object.keys(errors).length) {
                            showIncorrectDataToast();
                          }
                        }}
                      >
                        Send
                      </Button>
                      <ToastContainer position="bottom-right" />
                    </Form>
                  )}
                </Formik>
              )}
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
}

export default UnansweredMessage;
