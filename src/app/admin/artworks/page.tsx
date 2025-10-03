"use client";
import React from "react";

import Link from "next/link";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";

import ArtworkSearchComponent from "@/components/input/ArtworkSearchComponent";
import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

function Search() {
  const { t } = useI18n();

  return (
    <Container className="pb-5 mb-5">
      <PageTitle title={t("app.admin.artworks.title")} />

      <Row>
        <Col className="floating-element mx-auto mb-4" xs={5} md={4} lg={3}>
          <Link href="/admin/add_new_artwork">
            <p>
              <FontAwesomeIcon icon={faPlus} />
              <span> {t("app.admin.artworks.add_new_artwork")}</span>
            </p>
          </Link>
        </Col>
      </Row>

      <ArtworkSearchComponent admin={true} />
    </Container>
  );
}

export default Search;
