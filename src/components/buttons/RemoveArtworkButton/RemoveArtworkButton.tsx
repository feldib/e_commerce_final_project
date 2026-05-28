import React from "react";

import { faX } from "@fortawesome/free-solid-svg-icons";

import { uiToast } from "@/utils/toastUtils";

import { removeArtwork } from "@/fetching/artwork";

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
      errorToast={uiToast.errorRemoveArtwork}
      icon={faX}
      successToast={uiToast.artworkRemovedSuccessfully}
    />
  );
}

export default RemoveArtworkButton;
