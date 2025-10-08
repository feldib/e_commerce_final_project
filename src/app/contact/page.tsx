"use client";
import React from "react";

import {
  faAsterisk,
  faKeyboard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form as RBForm,
  Row,
} from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showIncorrectDataToast,
  showMessageSendErrorToast,
  showMessageSentSuccessToast,
} from "@/utils/toastUtils";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { sendMessageToAdministrator } from "@/fetching/fetching";

import { useContactSchema } from "@/hooks/useValidationSchemas";

function ContactUs() {
  const { loggedIn, user } = React.useContext(UserDataContext);
  const { t } = useI18n();
  const contactUsSchema = useContactSchema();
  const form = React.useRef<HTMLFormElement | null>(null);

  const initialValues = {
    email: loggedIn ? user.email : "",
    title: "",
    message: "",
  };

  const onSubmit = async (values: {
    email: string;
    title: string;
    message: string;
  }) => {
    try {
      await sendMessageToAdministrator(
        values.email,
        values.title,
        values.message
      );
      showMessageSentSuccessToast(t);
      form?.current?.reset();
    } catch {
      showMessageSendErrorToast(t);
    }
  };

  const handleSubmitClick = (errors: Record<string, unknown>) => {
    if (Object.keys(errors).length) {
      showIncorrectDataToast(t);
    }
  };

  return (
    <Container className="mb-5 pb-3">
      <PageTitle title={t("app.contact.title")} />

      <Row className="mx-auto mb-5">
        <Col className="mb-5 floating-element mx-auto my-2" md={5} sm={12}>
          <Row className="text-center">
            <h2>{t("app.contact.company_details")}</h2>
          </Row>

          <Row>
            <p>{t("app.contact.company_name")}</p>
            <p>{t("app.contact.company_address")}</p>
            <p>{t("app.contact.company_phone")}</p>
          </Row>
        </Col>

        <Col className="mb-5 floating-element mx-auto my-2" md={5} sm={12}>
          <Row className="text-center">
            <h2>{t("app.contact.message_administrator")}</h2>
          </Row>

          <Row>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={contactUsSchema}
            >
              {({ errors, touched }) => (
                <Form ref={form}>
                  <InputComponent
                    icon={faUser}
                    label={t("app.contact.email_address")}
                    name="email"
                    placeholder={t("app.contact.enter_email")}
                    showAsterisk={!!errors.email && !!touched.email}
                    type="email"
                  />

                  <InputComponent
                    icon={faKeyboard}
                    label={t("app.contact.title_field")}
                    name="title"
                    placeholder={t("app.contact.enter_message_title")}
                    showAsterisk={!!errors.title && !!touched.title}
                    type="text"
                  />

                  <RBForm.Group className="mb-3">
                    <RBForm.Label>{t("app.contact.message")}</RBForm.Label>
                    {errors.message && touched.message && (
                      <FontAwesomeIcon
                        className="mx-3"
                        icon={faAsterisk}
                        style={{ color: "red" }}
                      />
                    )}
                    <FloatingLabel label="">
                      <Field
                        as="textarea"
                        className="form-control"
                        name="message"
                        placeholder={t("app.contact.enter_message")}
                        style={{ height: "100px" }}
                      />
                    </FloatingLabel>
                    <ErrorMessage
                      className="input-error-message"
                      component="div"
                      name="message"
                    />
                  </RBForm.Group>

                  <Button
                    onClick={() => handleSubmitClick(errors)}
                    type="submit"
                    variant="primary"
                  >
                    {t("common.send")}
                  </Button>
                  <ToastContainer position="bottom-right" />
                </Form>
              )}
            </Formik>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUs;
