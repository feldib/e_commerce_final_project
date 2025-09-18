"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAsterisk,
  faUser,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Container,
  Button,
  FloatingLabel,
  Form as RBForm,
} from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import InputComponent from "@/components/input/InputComponent";
import { sendMessageToAdministrator } from "@/fetching/fetching";
import PageTitle from "@/components/PageTitle";
import { UserDataContext } from "@/components/providers/UserDataProvider";

function ContactUs() {
  const { loggedIn, user } = React.useContext(UserDataContext);
  const form = React.useRef<HTMLFormElement | null>(null);

  const initialValues = {
    email: loggedIn ? user.email : "",
    title: "",
    message: "",
  };

  const contactUsSchema = Yup.object().shape({
    email: Yup.string().required("Email required").email("Invalid email"),
    title: Yup.string().required("Title required"),
    message: Yup.string().required("Message required"),
  });

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
      toast.success("Message sent", {
        className: "toast-success",
      });
      form?.current?.reset();
    } catch {
      toast.error("Error: couldn't send message", {
        className: "toast-error",
      });
    }
  };

  return (
    <Container className="mb-5 pb-3">
      <PageTitle title="Contact us" />

      <Row className="mx-auto mb-5">
        <Col sm={12} md={5} className="mb-5 floating-element mx-auto my-2">
          <Row className="text-center">
            <h2>Company details</h2>
          </Row>

          <Row>
            <p>Name: Artwork Market</p>
            <p>Address: Budapest, Hungary</p>
            <p>Phone: +36 xx xxx xxxx</p>
          </Row>
        </Col>

        <Col sm={12} md={5} className="mb-5 floating-element mx-auto my-2">
          <Row className="text-center">
            <h2>Message administrator</h2>
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
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    icon={faUser}
                    showAsterisk={!!errors.email && !!touched.email}
                  />

                  <InputComponent
                    label="Title"
                    name="title"
                    type="text"
                    placeholder="Enter message title"
                    icon={faKeyboard}
                    showAsterisk={!!errors.title && !!touched.title}
                  />

                  <RBForm.Group className="mb-3">
                    <RBForm.Label>Message</RBForm.Label>
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
                        placeholder="Enter message"
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
                        toast.error("Incorrect data", {
                          className: "toast-error",
                        });
                      }
                    }}
                  >
                    Send
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
