"use client";
import React from "react";

import { Container, Row } from "react-bootstrap";

import ResetPasswordForm from "@/components/input/ResetPasswordForm";
import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

function ResetPassword() {
  const { t } = useI18n();

  return (
    <Container className="pb-5">
      <PageTitle title={t("app.reset_password.title")} />
      <Row className="floating-element">
        <ResetPasswordForm />
      </Row>
    </Container>
  );
}

export default ResetPassword;
