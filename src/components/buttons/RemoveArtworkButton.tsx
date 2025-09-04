import React from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { removeArtwork } from "@/fetching/fetching";
import SinglePurposeButton from "./SinglePurposeButton";

type RemoveArtworkButtonProps = {
  removeLineFromView: () => void;
  artwork_id: number;
};

function RemoveArtworkButton(props: RemoveArtworkButtonProps) {
  return (
    <SinglePurposeButton
      actionOnLoggedIn={(artwork_id) => {
        props.removeLineFromView();
        return removeArtwork(artwork_id);
      }}
      artwork_id={props.artwork_id}
      toastSuccessMessage="Artwork removed successfully"
      toastErrorMessage="Error: item could not be removed"
      icon={faX}
    />
  );
}

export default RemoveArtworkButton;
