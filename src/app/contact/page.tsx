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
  showMessageErrorToast,
  showMessageSentToast,
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
      showMessageSentToast();
      form?.current?.reset();
    } catch {
      showMessageErrorToast();
    }
  };

  return (
    <Container className="mb-5 pb-3">
      <PageTitle title={t("app.contact.title")} />

      <Row className="mx-auto mb-5">
        <Col sm={12} md={5} className="mb-5 floating-element mx-auto my-2">
          <Row className="text-center">
            <h2>{t("app.contact.company_details")}</h2>
          </Row>

          <Row>
            <p>{t("app.contact.company_name")}</p>
            <p>{t("app.contact.company_address")}</p>
            <p>{t("app.contact.company_phone")}</p>
          </Row>
        </Col>

        <Col sm={12} md={5} className="mb-5 floating-element mx-auto my-2">
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
                    label={t("app.contact.email_address")}
                    name="email"
                    type="email"
                    placeholder={t("app.contact.enter_email")}
                    icon={faUser}
                    showAsterisk={!!errors.email && !!touched.email}
                  />

                  <InputComponent
                    label={t("app.contact.title_field")}
                    name="title"
                    type="text"
                    placeholder={t("app.contact.enter_message_title")}
                    icon={faKeyboard}
                    showAsterisk={!!errors.title && !!touched.title}
                  />

                  <RBForm.Group className="mb-3">
                    <RBForm.Label>{t("app.contact.message")}</RBForm.Label>
                    {errors.message && touched.message && (
                      <FontAwesomeIcon
                        icon={faAsterisk}
                        style={{ color: "red" }}
                        className="mx-3"
                      />
                    )}
                    <FloatingLabel label="">
                      <Field
                        className="form-control"
                        name="message"
                        as="textarea"
                        placeholder={t("app.contact.enter_message")}
                        style={{ height: "100px" }}
                      />
                    </FloatingLabel>
                    <ErrorMessage
                      component="div"
                      className="input-error-message"
                      name="message"
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
