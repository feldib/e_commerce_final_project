"use client";
import React from "react";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import InputComponent from "@/components/input/InputComponent/InputComponent";
import PageTitle from "@/components/layout/PageTitle/PageTitle";

import useForgotPasswordForm from "./useForgotPasswordForm";

function ForgotPasswordForm() {
  const { t, displayMessage, forgotPasswordSchema, initialValues, onSubmit } =
    useForgotPasswordForm();

  return (
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
                hasError={!!errors.email && !!touched.email}
                icon={faUser}
                label={t("common.fields.email_address")}
                name="email"
                placeholder={t("common.placeholders.enter_email")}
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
  );
}

export default ForgotPasswordForm;
