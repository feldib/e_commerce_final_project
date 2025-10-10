"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";

import { Artwork } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";

type UseRecommendationsProps = {
  path: string;
};

type UseRecommendationsReturn = {
  handleToggleRecommendations: () => void;
  isMd: boolean;
  recommendations: Artwork[];
  tableHidden: boolean;
};

function useRecommendations({
  path,
}: UseRecommendationsProps): UseRecommendationsReturn {
  const [tableHidden, setTableHidden] = React.useState(false);
  const recommendations = useAxios(`${path}?n=10`) as Artwork[];

  const isMd = useMediaQuery({ minWidth: "768px" });

  const handleToggleRecommendations = () => {
    setTableHidden(!tableHidden);
  };

  return {
    handleToggleRecommendations,
    isMd,
    recommendations,
    tableHidden,
  };
}

export default useRecommendations;
