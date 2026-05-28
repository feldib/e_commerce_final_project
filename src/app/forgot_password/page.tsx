"use client";
import React from "react";

import { Container } from "react-bootstrap";

import ForgotPasswordForm from "@/components/input/ForgotPasswordForm/ForgotPasswordForm";
import PageTitle from "@/components/layout/PageTitle/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

function ForgotPassword() {
  const { t } = useI18n();

  return (
    <Container className="pb-5">
      <PageTitle title={t("app.forgot_password.title")} />
      <ForgotPasswordForm />
    </Container>
  );
}

export default ForgotPassword;
