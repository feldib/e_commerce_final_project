"use client"
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { sendForgotPasswordEmail } from "@/fetching/fetching";
import InputComponent from "../../components/input/InputComponent";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";

function ForgotPassword() {
  const [displayMessage, setDisplayMessage] = React.useState(false);

  const initialValues = {
    email: "",
  };

  const onSubmit = (values: any) => {
    sendForgotPasswordEmail(values.email)
      .then(() => {
        setDisplayMessage(true);
        toast.success("Email submitted", {
          className: "toast-success",
        });
      })
      .catch(() => {
        toast.error("Error: couldn't submit", {
          className: "toast-error",
        });
      });
  };

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required("Email required").email("Invalid email"),
  });

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
