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
    warningToast,
  } = useFavouriteButton({ artwork_id });

  return (
    <AddOrRemoveFromButton
      addToAdded={addToAdded}
      artwork_id={artwork_id}
      filledButton={filledButton}
      isAdded={isAdded}
      regularButton={regularButton}
      removeFromAdded={removeFromAdded}
      warningToast={warningToast}
    />
  );
}

export default FavouriteButton;
