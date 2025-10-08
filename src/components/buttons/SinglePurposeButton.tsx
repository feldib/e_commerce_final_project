"use client";
import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";

import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";

import { UserDataContext } from "@/components/providers/UserDataProvider";

type SinglePurposeButtonProps = {
  artwork_id: number;
  actionOnLoggedIn: (artwork_id: number) => Promise<unknown>;
  actionOnNotLoggedIn?: () => void;
  toastSuccessMessage: string;
  toastErrorMessage: string;
  icon: IconDefinition;
};

function SinglePurposeButton({
  artwork_id,
  actionOnLoggedIn,
  actionOnNotLoggedIn,
  toastSuccessMessage,
  toastErrorMessage,
  icon,
}: SinglePurposeButtonProps) {
  const { loggedIn } = React.useContext(UserDataContext);

  const handleClick = async () => {
    if (loggedIn) {
      try {
        await actionOnLoggedIn(artwork_id);
        showSuccessToast(toastSuccessMessage);
      } catch {
        showErrorToast(toastErrorMessage);
      }
    } else {
      if (actionOnNotLoggedIn) {
        try {
          actionOnNotLoggedIn();
          showSuccessToast(toastSuccessMessage);
        } catch {
          showErrorToast(toastErrorMessage);
        }
      }
    }
  };

  return (
    <Row>
      <p
        className="table-button"
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={icon} />
      </p>
    </Row>
  );
}
export default SinglePurposeButton;
