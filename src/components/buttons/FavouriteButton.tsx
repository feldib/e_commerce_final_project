"use client";
import React from "react";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  addToWishlisted,
  isWishlisted,
  removeFromWishlisted,
} from "@/fetching/fetching";

import AddOrRemoveFromButton from "./AddOrRemoveButton";

type FavouriteButtonProps = {
  artwork_id: number;
};

function FavouriteButton({ artwork_id }: FavouriteButtonProps) {
  return (
    <AddOrRemoveFromButton
      isAdded={isWishlisted}
      addToAdded={addToWishlisted}
      removeFromAdded={removeFromWishlisted}
      artwork_id={artwork_id}
      toastWarningMessage="Sign in or register to add to wishlist! "
      filledButton={<FontAwesomeIcon icon={faHeartSolid} />}
      regularButton={<FontAwesomeIcon icon={faHeartRegular} />}
    />
  );
}

export default FavouriteButton;
