"use client";
import React from "react";

import AddOrRemoveFromButton from "../AddOrRemoveButton/AddOrRemoveButton";
import useFavouriteButton from "./useFavouriteButton";

type FavouriteButtonProps = {
  artwork_id: number;
};

function FavouriteButton({ artwork_id }: FavouriteButtonProps) {
  const {
    addToAdded,
    filledButton,
    isAdded,
    regularButton,
    removeFromAdded,
    toastWarningMessage,
  } = useFavouriteButton({ artwork_id });

  return (
    <AddOrRemoveFromButton
      addToAdded={addToAdded}
      artwork_id={artwork_id}
      filledButton={filledButton}
      isAdded={isAdded}
      regularButton={regularButton}
      removeFromAdded={removeFromAdded}
      toastWarningMessage={toastWarningMessage}
    />
  );
}

export default FavouriteButton;
