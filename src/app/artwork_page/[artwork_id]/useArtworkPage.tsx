"use client";
import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import ArtworkDetails from "@/components/artwork_details/ArtworkDetails";

import { Artwork } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

type UseArtworkPageReturn = {
  artwork: React.ReactNode;
  navigatedFromRouter: boolean;
  router: ReturnType<typeof useRouter>;
};

function useArtworkPage(): UseArtworkPageReturn {
  const [navigatedFromRouter, setNavigatedFromRouter] = useState(false);
  const router = useRouter();
  const { artwork_id } = useParams();

  useEffect(() => {
    setNavigatedFromRouter(window.history.length > 1);
  }, []);

  const artworkData = useAxios(`/artwork?id=${artwork_id}`) as Artwork;

  const artwork = useLoading(artworkData, (artwork: Artwork) => {
    return (
      <ArtworkDetails
        artwork={artwork}
        artwork_id={artwork_id ? parseInt(artwork_id as string) : 0}
      />
    );
  });

  return {
    artwork,
    navigatedFromRouter,
    router,
  };
}

export default useArtworkPage;
