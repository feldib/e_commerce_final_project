"use client";
import React, { Suspense } from "react";

import { useSearchParams } from "next/navigation";

import { faKey, faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showRegistrationFailedToast,
  showRegistrationSuccessToast,
  showUserAlreadyExistsToast,
} from "@/utils/toastUtils";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

import { registerNewUser } from "@/fetching/fetching";
import { logIn } from "@/fetching/fetching";
import { User } from "@/fetching/types";

import { createHandleSubmitClick } from "@/helpers/formValidationHelpers";
import { useRegistrationSchema } from "@/hooks/useValidationSchemas";

type RegistrationPageProps = {
  settleSuccessfulRegistration: (
    to_checkout: boolean,
    userData: { user: User }
  ) => void;
};

function RegistrationPageInner({
  settleSuccessfulRegistration,
}: RegistrationPageProps) {
  const searchParams = useSearchParams();
  const to_checkout = searchParams.get("to_checkout") === "true";
  const { t } = useI18n();
  const registrationSchema = useRegistrationSchema();

  const attemptRegistration = async (
    values: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    settleSuccessfulRegistration: (
      to_checkout: boolean,
      userData: { user: User }
    ) => void
  ) => {
    await registerNewUser(
      values.email,
      values.password,
      values.firstName,
      values.lastName
    )
      .then(function () {
        logIn(values.email, values.password, (userData) => {
          settleSuccessfulRegistration(to_checkout, { user: userData });
          showRegistrationSuccessToast(t);
        });
      })
      .catch(() => {
        showRegistrationFailedToast(t);
      });
  };

  const initialValues = {
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  };

  async function onSubmit(values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
  }) {
    try {
      await attemptRegistration(values, settleSuccessfulRegistration);
    } catch {
      showUserAlreadyExistsToast(t);
    }
  }

  const handleSubmitClick = createHandleSubmitClick(t);

  return (
    <Container className="pb-5 px-3">
      <PageTitle title={t("app.register.title")} />
      <Row className="mx-auto mb-5 pb-5 floating-element">
        <Col className="mx-5 pb-5 ">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={registrationSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <InputComponent
                  hasError={!!errors.email && !!touched.email}
                  icon={faUser}
                  label={t("app.register.email_address")}
                  name="email"
                  placeholder={t("common.enter_email")}
                  type="email"
                />

                <InputComponent
                  hasError={!!errors.repeatEmail && !!touched.repeatEmail}
                  icon={faUser}
                  label={t("app.register.email_address_again")}
                  name="repeatEmail"
                  placeholder={t("app.register.enter_email_again")}
                  type="email"
                />

                <InputComponent
                  hasError={!!errors.password && !!touched.password}
                  icon={faKey}
                  label={t("app.register.password")}
                  name="password"
                  placeholder={t("app.register.enter_password")}
                  type="password"
                />

                <InputComponent
                  hasError={!!errors.repeatPassword && !!touched.repeatPassword}
                  icon={faKey}
                  label={t("app.register.password_again")}
                  name="repeatPassword"
                  placeholder={t("app.register.enter_password_again")}
                  type="password"
                />

                <InputComponent
                  hasError={!!errors.firstName && !!touched.firstName}
                  icon={faQuestion}
                  label={t("app.register.first_name")}
                  name="firstName"
                  placeholder={t("app.register.enter_first_name")}
                  type="text"
                />

                <InputComponent
                  hasError={!!errors.lastName && !!touched.lastName}
                  icon={faQuestion}
                  label={t("app.register.last_name")}
                  name="lastName"
                  placeholder={t("app.register.enter_last_name")}
                  type="text"
                />

                <Button
                  onClick={() => handleSubmitClick(errors)}
                  type="submit"
                  variant="primary"
                >
                  {t("common.register")}
                </Button>
                <ToastContainer position="bottom-right" />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

function RegistrationPage(props: RegistrationPageProps) {
  return (
    <Suspense>
      <RegistrationPageInner {...props} />
    </Suspense>
  );
}

export default RegistrationPage;
