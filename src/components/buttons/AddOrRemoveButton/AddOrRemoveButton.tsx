"use client";
import React from "react";

import { Row } from "react-bootstrap";

import useAddOrRemoveButton from "./useAddOrRemoveButton";

type AddOrRemoveFromButtonProps = {
  artwork_id: number;
  isAdded: (artwork_id: number) => Promise<boolean>;
  addToAdded: (artwork_id: number) => Promise<void>;
  removeFromAdded: (artwork_id: number) => Promise<void>;
  filledButton: React.ReactNode;
  regularButton: React.ReactNode;
  toastWarningMessage: string;
};

function AddOrRemoveFromButton({
  artwork_id,
  isAdded,
  addToAdded,
  removeFromAdded,
  filledButton,
  regularButton,
  toastWarningMessage,
}: AddOrRemoveFromButtonProps) {
  const { added, handleButtonClick } = useAddOrRemoveButton({
    artwork_id,
    isAdded,
    addToAdded,
    removeFromAdded,
    toastWarningMessage,
  });

  return (
    <Row className="py-2">
      <button
        className="table-button"
        onClick={handleButtonClick}
        style={{ cursor: "pointer" }}
      >
        {added ? <>{filledButton}</> : <>{regularButton}</>}
      </button>
    </Row>
  );
}

export default AddOrRemoveFromButton;
