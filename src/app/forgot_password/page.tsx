"use client";
import React from "react";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showEmailSubmittedSuccessToast,
  showFormSubmissionErrorToast,
} from "@/utils/toastUtils";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

import { sendForgotPasswordEmail } from "@/fetching/fetching";

import { useForgotPasswordSchema } from "@/hooks/useValidationSchemas";

function ForgotPassword() {
  const [displayMessage, setDisplayMessage] = React.useState(false);
  const { t } = useI18n();
  const forgotPasswordSchema = useForgotPasswordSchema();

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
        showEmailSubmittedSuccessToast(t);
      })
      .catch(() => {
        showFormSubmissionErrorToast(t);
      });
  };

  return (
    <Container className="pb-5">
      <PageTitle title={t("app.forgot_password.title")} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={forgotPasswordSchema}
      >
        {({ errors, touched }) => (
          <Row className="floating-element">
            <Col className="mx-5 pb-5">
              <Form>
                <InputComponent
                  icon={faUser}
                  label={t("app.forgot_password.email_address")}
                  name="email"
                  placeholder={t("app.forgot_password.enter_email")}
                  showAsterisk={!!errors.email && !!touched.email}
                  type="email"
                />
                {displayMessage && (
                  <p className="text-muted">
                    {t("app.forgot_password.recovery_message")}
                  </p>
                )}
                <Button type="submit" variant="primary">
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
