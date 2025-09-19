import React from "react";
import {
  addToFeatured,
  removeFromFeatured,
  isFeatured,
} from "@/fetching/fetching";
import AddOrRemoveFromButton from "./AddOrRemoveButton";
import TrophyFilled from "../svg_components/trophy_filled";
import TrophyRegular from "../svg_components/trophy_regular";

type FeatureButtonProps = {
  artwork_id: number;
};

function FeatureButton({ artwork_id }: FeatureButtonProps) {
  return (
    <AddOrRemoveFromButton
      isAdded={isFeatured}
      addToAdded={addToFeatured}
      removeFromAdded={removeFromFeatured}
      artwork_id={artwork_id}
      toastWarningMessage="Sign in as an admin to add to favourites "
      filledButton={<TrophyFilled height="25px" />}
      regularButton={<TrophyRegular height="25px" />}
    />
  );
}

export default FeatureButton;
