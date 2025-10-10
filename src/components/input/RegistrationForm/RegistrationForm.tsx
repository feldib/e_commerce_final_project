"use client";
import React, { Suspense } from "react";

import { useSearchParams } from "next/navigation";

import { faKey, faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showRegistrationFailedToast,
  showRegistrationSuccessToast,
  showUserAlreadyExistsToast,
} from "@/utils/toastUtils";

import InputComponent from "@/components/input/InputComponent/InputComponent";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { registerNewUser } from "@/fetching/auth";
import { logIn } from "@/fetching/auth";
import { User } from "@/fetching/types";

import { createHandleSubmitClick } from "@/helpers/formValidationHelpers";
import { useRegistrationSchema } from "@/hooks/useValidationSchemas";

type RegistrationFormValues = {
  email: string;
  repeatEmail: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
};

function RegistrationFormInner() {
  const searchParams = useSearchParams();
  const to_checkout = searchParams.get("to_checkout") === "true";
  const { t } = useI18n();
  const registrationSchema = useRegistrationSchema();

  const settleSuccessfulRegistration = (
    to_checkout: boolean,
    userData: { user: User }
  ) => {
    // Handle successful registration logic here
    // For now, just show success toast
    console.log("Registration successful", { to_checkout, userData });
  };

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

  async function onSubmit(values: RegistrationFormValues) {
    try {
      await attemptRegistration(values, settleSuccessfulRegistration);
    } catch {
      showUserAlreadyExistsToast(t);
    }
  }

  const handleSubmitClick = createHandleSubmitClick(t);

  return (
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
              label={t("common.fields.email_address")}
              name="email"
              placeholder={t("common.placeholders.enter_email")}
              type="email"
            />

            <InputComponent
              hasError={!!errors.repeatEmail && !!touched.repeatEmail}
              icon={faUser}
              label={t("components.forms.registration.email_address_again")}
              name="repeatEmail"
              placeholder={t("components.forms.registration.enter_email_again")}
              type="email"
            />

            <InputComponent
              hasError={!!errors.password && !!touched.password}
              icon={faKey}
              label={t("common.fields.password")}
              name="password"
              placeholder={t("common.placeholders.enter_password")}
              type="password"
            />

            <InputComponent
              hasError={!!errors.repeatPassword && !!touched.repeatPassword}
              icon={faKey}
              label={t("components.forms.registration.password_again")}
              name="repeatPassword"
              placeholder={t(
                "components.forms.registration.enter_password_again"
              )}
              type="password"
            />

            <InputComponent
              hasError={!!errors.firstName && !!touched.firstName}
              icon={faQuestion}
              label={t("common.fields.first_name")}
              name="firstName"
              placeholder={t("common.placeholders.enter_first_name")}
              type="text"
            />

            <InputComponent
              hasError={!!errors.lastName && !!touched.lastName}
              icon={faQuestion}
              label={t("common.fields.last_name")}
              name="lastName"
              placeholder={t("common.placeholders.enter_last_name")}
              type="text"
            />

            <Button
              onClick={() => handleSubmitClick(errors)}
              type="submit"
              variant="primary"
            >
              {t("common.actions.register")}
            </Button>
            <ToastContainer position="bottom-right" />
          </Form>
        )}
      </Formik>
    </Col>
  );
}

function RegistrationForm() {
  return (
    <Suspense>
      <RegistrationFormInner />
    </Suspense>
  );
}

export default RegistrationForm;
