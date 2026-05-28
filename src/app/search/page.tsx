"use client";
import React from "react";

import { Container } from "react-bootstrap";

import ArtworkSearchComponent from "@/components/input/search/ArtworkSearchComponent/ArtworkSearchComponent";
import PageTitle from "@/components/layout/PageTitle/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

function Search() {
  const { t } = useI18n();

  return (
    <Container className="pb-5 mb-5">
      <PageTitle title={t("common.actions.search")} />
      <ArtworkSearchComponent admin={false} />
    </Container>
  );
}

export default Search;
