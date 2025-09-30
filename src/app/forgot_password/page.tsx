"use client";
import React from "react";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showEmailSubmittedToast,
  showSubmissionErrorToast,
} from "@/utils/toastUtils";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

import { sendForgotPasswordEmail } from "@/fetching/fetching";

import { useValidationSchemas } from "@/hooks/useValidationSchemas";

function ForgotPassword() {
  const [displayMessage, setDisplayMessage] = React.useState(false);
  const { t } = useI18n();
  const { forgotPasswordSchema } = useValidationSchemas();

  type ForgotPasswordFormValues = {
    email: string;
  };

  const initialValues: ForgotPasswordFormValues = {
    email: "",
  };

  const onSubmit = (values: ForgotPasswordFormValues) => {
    sendForgotPasswordEmail(values.email)
      .then(() => {
        setDisplayMessage(true);
        showEmailSubmittedToast();
      })
      .catch(() => {
        showSubmissionErrorToast();
      });
  };

  return (
    <Container className="pb-5">
      <PageTitle title={t("app.forgot_password.title")} />
      <Formik
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Row className="floating-element">
            <Col className="mx-5 pb-5">
              <Form>
                <InputComponent
                  label={t("app.forgot_password.email_address")}
                  name="email"
                  type="email"
                  placeholder={t("app.forgot_password.enter_email")}
                  icon={faUser}
                  showAsterisk={!!errors.email && !!touched.email}
                />
                {displayMessage && (
                  <p className="text-muted">
                    {t("app.forgot_password.recovery_message")}
                  </p>
                )}
                <Button variant="primary" type="submit">
                  {t("app.forgot_password.send_link")}
                </Button>
                <ToastContainer position="bottom-right" />
              </Form>
            </Col>
          </Row>
        )}
      </Formik>
    </Container>
  );
}

export default ForgotPassword;
