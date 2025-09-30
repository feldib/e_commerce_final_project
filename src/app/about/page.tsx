"use client";
import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

const AboutUsPage: React.FC = () => {
  const { t } = useI18n();

  return (
    <Container className="px-3 pb-5">
      <PageTitle title={t("app.about.title")} />
      <Row className="mx-auto mb-5">
        <Col className="pb-5 floating-element">
          <Row className="text-center">
            <h2>{t("app.about.our_story")}</h2>
          </Row>

          <Row>
            <p>{t("app.about.story_paragraph_1")}</p>
            <p>{t("app.about.story_paragraph_2")}</p>
            <p>{t("app.about.story_paragraph_3")}</p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;
