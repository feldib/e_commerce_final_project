import React from "react";

import {
  addToFeatured,
  isFeatured,
  removeFromFeatured,
} from "@/fetching/fetching";

import Trophy from "../svg_components/Trophy";
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
      filledButton={<Trophy height="25px" filled />}
      regularButton={<Trophy height="25px" />}
    />
  );
}

export default FeatureButton;
