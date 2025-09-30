"use client";
import React, { Suspense } from "react";

import { useSearchParams } from "next/navigation";

import { faKey, faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showErrorToast,
  showIncorrectDataToast,
  showSuccessToast,
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
        });
      })
      .catch(() => {
        showErrorToast(t("toast.registration_failed"));
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
      showSuccessToast(t("toast.registration_successful"));
    } catch {
      showErrorToast(t("toast.user_already_registered"));
    }
  }

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
                  label={t("app.register.email_address")}
                  name="email"
                  type="email"
                  placeholder={t("common.enter_email")}
                  icon={faUser}
                  showAsterisk={!!errors.email && !!touched.email}
                />

                <InputComponent
                  label={t("app.register.email_address_again")}
                  name="repeatEmail"
                  type="email"
                  placeholder={t("app.register.enter_email_again")}
                  icon={faUser}
                  showAsterisk={!!errors.repeatEmail && !!touched.repeatEmail}
                />

                <InputComponent
                  label={t("app.register.password")}
                  name="password"
                  type="password"
                  placeholder={t("app.register.enter_password")}
                  icon={faKey}
                  showAsterisk={!!errors.password && !!touched.password}
                />

                <InputComponent
                  label={t("app.register.password_again")}
                  name="repeatPassword"
                  type="password"
                  placeholder={t("app.register.enter_password_again")}
                  icon={faKey}
                  showAsterisk={
                    !!errors.repeatPassword && !!touched.repeatPassword
                  }
                />

                <InputComponent
                  label={t("app.register.first_name")}
                  name="firstName"
                  type="text"
                  placeholder={t("app.register.enter_first_name")}
                  icon={faQuestion}
                  showAsterisk={!!errors.firstName && !!touched.firstName}
                />

                <InputComponent
                  label={t("app.register.last_name")}
                  name="lastName"
                  type="text"
                  placeholder={t("app.register.enter_last_name")}
                  icon={faQuestion}
                  showAsterisk={!!errors.lastName && !!touched.lastName}
                />

                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    if (Object.keys(errors).length) {
                      showIncorrectDataToast();
                    }
                  }}
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
