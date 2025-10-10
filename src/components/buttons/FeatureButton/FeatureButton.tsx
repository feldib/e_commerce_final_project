import React from "react";

import {
  addToFeatured,
  isFeatured,
  removeFromFeatured,
} from "@/fetching/fetching";

import Trophy from "../../svg_components/Trophy/Trophy";
import AddOrRemoveFromButton from "../AddOrRemoveButton/AddOrRemoveButton";

type FeatureButtonProps = {
  artwork_id: number;
};

function FeatureButton({ artwork_id }: FeatureButtonProps) {
  return (
    <AddOrRemoveFromButton
      addToAdded={addToFeatured}
      artwork_id={artwork_id}
      filledButton={<Trophy filled height="25px" />}
      isAdded={isFeatured}
      regularButton={<Trophy height="25px" />}
      removeFromAdded={removeFromFeatured}
      toastWarningMessage="Sign in as an admin to add to favourites "
    />
  );
}

export default FeatureButton;
