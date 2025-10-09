"use client";
import React, { Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showPasswordChangeErrorToast,
  showPasswordResetSuccessToast,
} from "@/utils/toastUtils";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

import { changePassword } from "@/fetching/fetching";

import { createHandleSubmitClick } from "@/helpers/formValidationHelpers";
import { useResetPasswordSchema } from "@/hooks/useValidationSchemas";

type ResetPasswordFormValues = {
  password: string;
  repeatPassword: string;
};

function ResetPasswordInner() {
  const initialValues: ResetPasswordFormValues = {
    password: "",
    repeatPassword: "",
  };

  const searchParams = useSearchParams();
  const { t } = useI18n();
  const resetPasswordSchema = useResetPasswordSchema();

  const router = useRouter();

  const onSubmit = (values: ResetPasswordFormValues) => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    changePassword(token, email, values.password)
      .then(() => {
        showPasswordResetSuccessToast(t);
        router.push("/login");
      })
      .catch(() => {
        showPasswordChangeErrorToast(t);
      });
  };

  const handleSubmitClick = createHandleSubmitClick(t);

  return (
    <Container className="pb-5">
      <PageTitle title={t("app.reset_password.title")} />
      <Row className="floating-element">
        <Col className="mx-5 pb-5">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={resetPasswordSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <InputComponent
                  hasError={!!errors.password && !!touched.password}
                  icon={faKey}
                  label={t("app.reset_password.password")}
                  name="password"
                  placeholder={t("app.reset_password.enter_password")}
                  type="password"
                />

                <InputComponent
                  hasError={!!errors.repeatPassword && !!touched.repeatPassword}
                  icon={faKey}
                  label={t("app.reset_password.password")}
                  name="repeatPassword"
                  placeholder={t("app.reset_password.enter_repeat_password")}
                  type="password"
                />

                <Button
                  onClick={() => handleSubmitClick(errors)}
                  type="submit"
                  variant="primary"
                >
                  {t("app.reset_password.change_password")}
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

function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordInner />
    </Suspense>
  );
}

export default ResetPassword;
