import React from "react";

import { faX } from "@fortawesome/free-solid-svg-icons";

import { removeArtwork } from "@/fetching/fetching";

import SinglePurposeButton from "../SinglePurposeButton/SinglePurposeButton";

type RemoveArtworkButtonProps = {
  removeLineFromView: () => void;
  artwork_id: number;
};

function RemoveArtworkButton({
  removeLineFromView,
  artwork_id,
}: RemoveArtworkButtonProps) {
  const handleRemoveArtwork = (artwork_id: number) => {
    removeLineFromView();
    return removeArtwork(artwork_id);
  };

  return (
    <SinglePurposeButton
      actionOnLoggedIn={handleRemoveArtwork}
      artwork_id={artwork_id}
      icon={faX}
      toastErrorMessage="Error: item could not be removed"
      toastSuccessMessage="Artwork removed successfully"
    />
  );
}

export default RemoveArtworkButton;
