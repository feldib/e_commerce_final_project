import React from "react";
import {
  addToFeatured,
  removeFromFeatured,
  isFeatured,
} from "@/fetching/fetching";
import AddOrRemoveFromButton from "./AddOrRemoveButton";

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
      filledButton={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/trophy_filled.png"
          height="25px"
          alt="remove from featured"
        />
      }
      regularButton={
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/trophy_regular.png" height="25px" alt="add to featured" />
      }
    />
  );
}

export default FeatureButton;
