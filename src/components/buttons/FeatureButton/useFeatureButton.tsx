"use client";

import {
  addToFeatured,
  isFeatured,
  removeFromFeatured,
} from "@/fetching/featured";

import Trophy from "../../svg_components/Trophy/Trophy";

type UseFeatureButtonProps = {
  artwork_id: number;
};

type UseFeatureButtonReturn = {
  addToAdded: (artwork_id: number) => Promise<void>;
  artwork_id: number;
  filledButton: React.ReactNode;
  isAdded: (artwork_id: number) => Promise<boolean>;
  regularButton: React.ReactNode;
  removeFromAdded: (artwork_id: number) => Promise<void>;
  toastWarningMessage: string;
};

function useFeatureButton({
  artwork_id,
}: UseFeatureButtonProps): UseFeatureButtonReturn {
  const addToAdded = addToFeatured;
  const isAdded = isFeatured;
  const regularButton = <Trophy height="25px" />;
  const removeFromAdded = removeFromFeatured;
  const filledButton = <Trophy filled height="25px" />;
  const toastWarningMessage = "Sign in as an admin to add to favourites ";

  return {
    addToAdded,
    artwork_id,
    filledButton,
    isAdded,
    regularButton,
    removeFromAdded,
    toastWarningMessage,
  };
}

export default useFeatureButton;
