"use client";
import React from "react";

import { Container, Row } from "react-bootstrap";

import RegistrationForm from "@/components/input/RegistrationForm";
import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

function RegistrationPage() {
  const { t } = useI18n();

  return (
    <Container className="pb-5 px-3">
      <PageTitle title={t("common.actions.register")} />
      <Row className="mx-auto mb-5 pb-5 floating-element">
        <RegistrationForm />
      </Row>
    </Container>
  );
}

export default RegistrationPage;
