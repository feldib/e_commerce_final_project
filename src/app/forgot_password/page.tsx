"use client";
import React from "react";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button,Col, Container, Row } from "react-bootstrap";
import { Form,Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showEmailSubmittedToast,
  showSubmissionErrorToast,
} from "@/utils/toastUtils";
import { forgotPasswordSchema } from "@/utils/validationSchemas";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/PageTitle";

import { sendForgotPasswordEmail } from "@/fetching/fetching";

function ForgotPassword() {
  const [displayMessage, setDisplayMessage] = React.useState(false);

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
      <PageTitle title="Send email to reset password" />
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
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  icon={faUser}
                  showAsterisk={!!errors.email && !!touched.email}
                />
                {displayMessage && (
                  <p className="text-muted">
                    If a user is registered with this email, a password recovery
                    link was sent to them
                  </p>
                )}
                <Button variant="primary" type="submit">
                  Send link
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
