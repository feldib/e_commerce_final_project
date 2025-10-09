"use client";
import React from "react";

import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Col,
  FloatingLabel,
  Form as RBForm,
  Row,
} from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showReplySendErrorToast,
  showReplySentSuccessToast,
} from "@/utils/toastUtils";

import ErrorAsterisk from "@/components/input/ErrorAsterisk";
import InputComponent from "@/components/input/InputComponent";
import { useI18n } from "@/components/providers/I18nProvider";

import { replyToMessage } from "@/fetching/fetching";

import { createHandleSubmitClick } from "@/helpers/formValidationHelpers";
import { useMessageReplySchema } from "@/hooks/useValidationSchemas";

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
  const { t } = useI18n();
  const messageReplySchema = useMessageReplySchema();
  const [replying, setReplying] = React.useState(false);
  const [replied, setReplied] = React.useState(false);

  const initialValues: ReplyToMessageProps = {
    reply_title: "",
    reply_text: "",
  };

  const handleReplyClick = () => {
    setReplying(true);
  };

  const onSubmit = async (values: ReplyToMessageProps) => {
    try {
      await replyToMessage(
        message.id,
        message.email,
        values.reply_title,
        values.reply_text
      );
      showReplySentSuccessToast(t);
      setReplied(true);
    } catch {
      showReplySendErrorToast(t);
    }
  };

  const handleSubmitClick = createHandleSubmitClick(t);

  return (
    <Row className="mx-auto mb-5 floating-element p-3">
      {replied ? (
        <Col>
          <h4>{t("common.reply_sent_successfully")}</h4>
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
                  onClick={handleReplyClick}
                  type="submit"
                  variant="primary"
                >
                  {t("components.unanswered_message.reply")}
                </Button>
              ) : (
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={messageReplySchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <InputComponent
                        hasError={!!errors.reply_title && !!touched.reply_title}
                        icon={faKeyboard}
                        label="Title"
                        name="reply_title"
                        placeholder={t(
                          "components.unanswered_message.enter_title"
                        )}
                        type="textarea"
                      />

                      <RBForm.Group className="mb-3">
                        <RBForm.Label>{t("common.message")}</RBForm.Label>
                        <ErrorAsterisk
                          show={!!(errors.reply_text && touched.reply_text)}
                        />
                        <FloatingLabel label="">
                          <Field
                            as="textarea"
                            className="form-control"
                            name="reply_text"
                            placeholder={t(
                              "components.unanswered_message.enter_reply"
                            )}
                            style={{ height: "100px" }}
                            type="text"
                          />
                        </FloatingLabel>
                        <ErrorMessage
                          className="input-error-message"
                          component="div"
                          name="reply_text"
                        />
                      </RBForm.Group>

                      <Button
                        onClick={() => handleSubmitClick(errors)}
                        type="submit"
                        variant="primary"
                      >
                        {t("components.unanswered_message.send_reply")}
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
