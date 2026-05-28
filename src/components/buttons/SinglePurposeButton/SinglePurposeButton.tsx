"use client";
import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import { Id } from "react-toastify/unstyled";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

type SinglePurposeButtonProps = {
  artwork_id: number;
  actionOnLoggedIn: (artwork_id: number) => Promise<unknown>;
  actionOnNotLoggedIn?: () => void;
  errorToast: (t: (key: string) => string) => Id;
  successToast: (t: (key: string) => string) => Id;
  icon: IconDefinition;
};

function SinglePurposeButton({
  artwork_id,
  actionOnLoggedIn,
  actionOnNotLoggedIn,
  errorToast,
  successToast,
  icon,
}: SinglePurposeButtonProps) {
  const { loggedIn } = React.useContext(UserDataContext);
  const { t } = useI18n();

  const handleClick = async () => {
    if (loggedIn) {
      try {
        await actionOnLoggedIn(artwork_id);
        successToast(t);
      } catch {
        errorToast(t);
      }
    } else {
      if (actionOnNotLoggedIn) {
        try {
          actionOnNotLoggedIn();
          successToast(t);
        } catch {
          errorToast(t);
        }
      }
    }
  };

  return (
    <Row>
      <button
        className="table-button"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    </Row>
  );
}
export default SinglePurposeButton;
