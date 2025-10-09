"use client";
import React from "react";

import { Container } from "react-bootstrap";

import ArtworkSearchComponent from "@/components/input/search/ArtworkSearchComponent";
import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

function Search() {
  const { t } = useI18n();

  return (
    <Container className="pb-5 mb-5">
      <PageTitle title={t("app.search.title")} />

      <ArtworkSearchComponent admin={false} />
    </Container>
  );
}

export default Search;
