"use client";
import React from "react";

import { faKeyboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, FloatingLabel, Form as RBForm, Row } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import ErrorAsterisk from "@/components/input/ErrorAsterisk/ErrorAsterisk";
import InputComponent from "@/components/input/InputComponent/InputComponent";

import useContactForm from "./useContactForm";

function ContactForm() {
  const {
    t,
    contactUsSchema,
    form,
    initialValues,
    onSubmit,
    handleSubmitClick,
  } = useContactForm();

  return (
    <Row>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={contactUsSchema}
      >
        {({ errors, touched }) => (
          <Form ref={form}>
            <InputComponent
              hasError={!!errors.email && !!touched.email}
              icon={faUser}
              label={t("common.fields.email_address")}
              name="email"
              placeholder={t("common.placeholders.enter_email")}
              type="email"
            />

            <InputComponent
              hasError={!!errors.title && !!touched.title}
              icon={faKeyboard}
              label={t("common.fields.title")}
              name="title"
              placeholder={t("common.placeholders.enter_message_title")}
              type="text"
            />

            <RBForm.Group className="mb-3">
              <RBForm.Label>{t("common.fields.message")}</RBForm.Label>
              <ErrorAsterisk show={!!(errors.message && touched.message)} />
              <FloatingLabel label="">
                <Field
                  as="textarea"
                  className="form-control"
                  name="message"
                  placeholder={t("common.placeholders.enter_message")}
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
              {t("common.actions.send")}
            </Button>
            <ToastContainer position="bottom-right" />
          </Form>
        )}
      </Formik>
    </Row>
  );
}

export default ContactForm;
