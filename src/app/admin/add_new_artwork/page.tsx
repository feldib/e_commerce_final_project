"use client";
import React from "react";

import { Container } from "react-bootstrap";

import AddArtworkForm from "@/components/artwork_details/AddArtworkForm/AddArtworkForm";
import PageTitle from "@/components/layout/PageTitle/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

function AddNewArtworkPage() {
  const { t } = useI18n();

  return (
    <Container className="px-3">
      <PageTitle title={t("app.admin.add_new_artwork.title")} />
      <AddArtworkForm />
    </Container>
  );
}

export default AddNewArtworkPage;
