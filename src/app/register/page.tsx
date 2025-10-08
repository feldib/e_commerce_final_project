"use client";
import React, { Suspense } from "react";

import { useSearchParams } from "next/navigation";

import { faKey, faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showIncorrectDataToast,
  showRegistrationFailedToast,
  showRegistrationSuccessToast,
  showUserAlreadyExistsToast,
} from "@/utils/toastUtils";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

import { registerNewUser } from "@/fetching/fetching";
import { logIn } from "@/fetching/fetching";
import { User } from "@/fetching/types";

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

  const handleSubmitClick = (errors: Record<string, unknown>) => {
    if (Object.keys(errors).length) {
      showIncorrectDataToast(t);
    }
  };

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
                  icon={faUser}
                  label={t("app.register.email_address")}
                  name="email"
                  placeholder={t("common.enter_email")}
                  showAsterisk={!!errors.email && !!touched.email}
                  type="email"
                />

                <InputComponent
                  icon={faUser}
                  label={t("app.register.email_address_again")}
                  name="repeatEmail"
                  placeholder={t("app.register.enter_email_again")}
                  showAsterisk={!!errors.repeatEmail && !!touched.repeatEmail}
                  type="email"
                />

                <InputComponent
                  icon={faKey}
                  label={t("app.register.password")}
                  name="password"
                  placeholder={t("app.register.enter_password")}
                  showAsterisk={!!errors.password && !!touched.password}
                  type="password"
                />

                <InputComponent
                  icon={faKey}
                  label={t("app.register.password_again")}
                  name="repeatPassword"
                  placeholder={t("app.register.enter_password_again")}
                  showAsterisk={
                    !!errors.repeatPassword && !!touched.repeatPassword
                  }
                  type="password"
                />

                <InputComponent
                  icon={faQuestion}
                  label={t("app.register.first_name")}
                  name="firstName"
                  placeholder={t("app.register.enter_first_name")}
                  showAsterisk={!!errors.firstName && !!touched.firstName}
                  type="text"
                />

                <InputComponent
                  icon={faQuestion}
                  label={t("app.register.last_name")}
                  name="lastName"
                  placeholder={t("app.register.enter_last_name")}
                  showAsterisk={!!errors.lastName && !!touched.lastName}
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
