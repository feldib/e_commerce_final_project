"use client";
import React from "react";

import { Container } from "react-bootstrap";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";

import useArtworkPage from "./useArtworkPage";

function ArtworkPage() {
  const { artwork, navigatedFromRouter, router } = useArtworkPage();

  return (
    <Container className="pb-5 mb-5">
      {artwork}
      {navigatedFromRouter && <FloatingBackButton router={router} />}
    </Container>
  );
}

export default ArtworkPage;
