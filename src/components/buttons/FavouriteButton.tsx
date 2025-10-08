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
      addToAdded={addToWishlisted}
      artwork_id={artwork_id}
      filledButton={<FontAwesomeIcon icon={faHeartSolid} />}
      isAdded={isWishlisted}
      regularButton={<FontAwesomeIcon icon={faHeartRegular} />}
      removeFromAdded={removeFromWishlisted}
      toastWarningMessage={t("components.buttons.sign_in_to_add_wishlist")}
    />
  );
}

export default FavouriteButton;
