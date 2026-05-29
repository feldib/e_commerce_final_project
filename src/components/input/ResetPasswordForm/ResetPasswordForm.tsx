"use client";
import React, { Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Button, Col } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import { authToast } from "@/utils/toastUtils";

import InputComponent from "@/components/input/InputComponent/InputComponent";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { changePassword } from "@/fetching/auth";

import { createHandleSubmitClick } from "@/helpers/formValidationHelpers";
import { useResetPasswordSchema } from "@/hooks/useValidationSchemas";

type ResetPasswordFormValues = {
  password: string;
  repeatPassword: string;
};

function ResetPasswordFormInner() {
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
        authToast.password.resetSuccess(t);
        router.push("/login");
      })
      .catch(() => {
        authToast.password.changeError(t);
      });
  };

  const handleSubmitClick = createHandleSubmitClick(t);

  return (
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
              label={t("common.fields.password")}
              name="password"
              placeholder={t("common.placeholders.enter_password")}
              type="password"
            />

            <InputComponent
              hasError={!!errors.repeatPassword && !!touched.repeatPassword}
              icon={faKey}
              label={t("common.fields.password")}
              name="repeatPassword"
              placeholder={t(
                "components.forms.reset_password.enter_repeat_password"
              )}
              type="password"
            />

            <Button
              onClick={() => handleSubmitClick(errors)}
              type="submit"
              variant="primary"
            >
              {t("common.actions.change_password")}
            </Button>
            <ToastContainer position="bottom-right" />
          </Form>
        )}
      </Formik>
    </Col>
  );
}

function ResetPasswordForm() {
  return (
    <Suspense>
      <ResetPasswordFormInner />
    </Suspense>
  );
}

export default ResetPasswordForm;
