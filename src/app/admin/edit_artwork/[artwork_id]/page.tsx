"use client";
import React from "react";

import { Container } from "react-bootstrap";

import EditArtworkForm from "@/components/artwork_details/EditArtworkForm";
import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

function EditArtworkData() {
  const { t } = useI18n();

  return (
    <Container className="px-3">
      <PageTitle title={t("app.admin.edit_artwork.title")} />
      <EditArtworkForm />
    </Container>
  );
}

export default EditArtworkData;
