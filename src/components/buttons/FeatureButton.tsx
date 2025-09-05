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

function FeatureButton(props: FeatureButtonProps) {
  return (
    <AddOrRemoveFromButton
      isAdded={isFeatured}
      addToAdded={addToFeatured}
      removeFromAdded={removeFromFeatured}
      artwork_id={props.artwork_id}
      toastWarningMessage="Sign in as an admin to add to favourites "
      filledButton={
        <img
          src="/trophy_filled.png"
          height="25px"
          alt="remove from featured"
        />
      }
      regularButton={
        <img src="/trophy_regular.png" height="25px" alt="add to featured" />
      }
    />
  );
}

export default FeatureButton;
