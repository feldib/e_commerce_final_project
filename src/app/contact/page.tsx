"use client";
import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import ContactForm from "@/components/input/ContactForm";
import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

function ContactUs() {
  const { t } = useI18n();

  return (
    <Container className="mb-5 pb-3">
      <PageTitle title={t("app.contact.title")} />

      <Row className="mx-auto mb-5">
        <Col className="mb-5 floating-element mx-auto my-2" md={5} sm={12}>
          <Row className="text-center">
            <h2>{t("app.contact.company_details")}</h2>
          </Row>

          <Row>
            <p>{t("app.contact.company_name")}</p>
            <p>{t("app.contact.company_address")}</p>
            <p>{t("app.contact.company_phone")}</p>
          </Row>
        </Col>

        <Col className="mb-5 floating-element mx-auto my-2" md={5} sm={12}>
          <Row className="text-center">
            <h2>{t("app.contact.message_administrator")}</h2>
          </Row>

          <ContactForm />
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUs;
