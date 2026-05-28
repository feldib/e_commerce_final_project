"use client";
import React, { Suspense } from "react";

import { Container } from "react-bootstrap";

import LoginForm from "@/components/input/LoginForm/LoginForm";
import PageTitle from "@/components/layout/PageTitle/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

function SignInPageInner() {
  const { t } = useI18n();

  return (
    <Container className="px-3 pb-5">
      <PageTitle title={t("app.login.title")} />
      <LoginForm />
    </Container>
  );
}

function SignInPage() {
  return (
    <Suspense>
      <SignInPageInner />
    </Suspense>
  );
}

export default SignInPage;
