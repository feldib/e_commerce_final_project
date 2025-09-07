"use client";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";
import ArtworkDetails from "../../../components/ArtworkDetails";
import FloatingBackButton from "../../../components/buttons/FloatingBackButton";
import { Artwork } from "@/fetching/types";

function ArtworkPage() {
  const [navigatedFromRouter, setNavigatedFromRouter] = useState(false);

  useEffect(() => {
    setNavigatedFromRouter(window.history.length > 1);
  }, []);

  const router = useRouter();

  const { artwork_id } = useParams();

  const artworkData = useAxios(`/artwork?id=${artwork_id}`) as Artwork;

  const artwork = useLoading(artworkData, (artwork: Artwork) => {
    return (
      <ArtworkDetails
        artwork={artwork}
        artwork_id={artwork_id ? parseInt(artwork_id as string) : 0}
      />
    );
  });

  return (
    <Container className="pb-5 mb-5">
      {artwork}

      {navigatedFromRouter && <FloatingBackButton router={router} />}
    </Container>
  );
}

export default ArtworkPage;
