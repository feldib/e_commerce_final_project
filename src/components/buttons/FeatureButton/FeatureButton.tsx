import React from "react";

import AddOrRemoveFromButton from "../AddOrRemoveButton/AddOrRemoveButton";
import useFeatureButton from "./useFeatureButton";

type FeatureButtonProps = {
  artwork_id: number;
};

function FeatureButton({ artwork_id }: FeatureButtonProps) {
  const {
    addToAdded,
    filledButton,
    isAdded,
    regularButton,
    removeFromAdded,
    toastWarningMessage,
  } = useFeatureButton({ artwork_id });

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

export default FeatureButton;
