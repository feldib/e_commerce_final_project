"use client";
import React from "react";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useI18n } from "@/components/providers/I18nProvider";

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
  const { t } = useI18n();

  return (
    <AddOrRemoveFromButton
      isAdded={isWishlisted}
      addToAdded={addToWishlisted}
      removeFromAdded={removeFromWishlisted}
      artwork_id={artwork_id}
      toastWarningMessage={t("components.buttons.sign_in_to_add_wishlist")}
      filledButton={<FontAwesomeIcon icon={faHeartSolid} />}
      regularButton={<FontAwesomeIcon icon={faHeartRegular} />}
    />
  );
}

export default FavouriteButton;
