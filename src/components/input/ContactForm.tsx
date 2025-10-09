"use client";
import React from "react";

import { faKeyboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, FloatingLabel, Form as RBForm, Row } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showMessageSendErrorToast,
  showMessageSentSuccessToast,
} from "@/utils/toastUtils";

import ErrorAsterisk from "@/components/input/ErrorAsterisk";
import InputComponent from "@/components/input/InputComponent";
import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { sendMessageToAdministrator } from "@/fetching/fetching";

import { createHandleSubmitClick } from "@/helpers/formValidationHelpers";
import { useContactSchema } from "@/hooks/useValidationSchemas";

type ContactFormValues = {
  email: string;
  title: string;
  message: string;
};

function ContactForm() {
  const { loggedIn, user } = React.useContext(UserDataContext);
  const { t } = useI18n();
  const contactUsSchema = useContactSchema();
  const form = React.useRef<HTMLFormElement | null>(null);

  const initialValues = {
    email: loggedIn ? user.email : "",
    title: "",
    message: "",
  };

  const onSubmit = async (values: ContactFormValues) => {
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

  const handleSubmitClick = createHandleSubmitClick(t);

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
              label={t("common.email_address")}
              name="email"
              placeholder={t("common.enter_email")}
              type="email"
            />

            <InputComponent
              hasError={!!errors.title && !!touched.title}
              icon={faKeyboard}
              label={t("common.title")}
              name="title"
              placeholder={t("common.enter_message_title")}
              type="text"
            />

            <RBForm.Group className="mb-3">
              <RBForm.Label>{t("common.message")}</RBForm.Label>
              <ErrorAsterisk show={!!(errors.message && touched.message)} />
              <FloatingLabel label="">
                <Field
                  as="textarea"
                  className="form-control"
                  name="message"
                  placeholder={t("common.enter_message")}
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
  );
}

export default ContactForm;
