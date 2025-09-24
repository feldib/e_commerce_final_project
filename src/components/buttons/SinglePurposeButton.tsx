"use client";
import React from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";

import { UserDataContext } from "@/components/providers/UserDataProvider";

type SinglePurposeButtonProps = {
  artwork_id: number;
  actionOnLoggedIn: (artwork_id: number) => Promise<Axios.AxiosXHR<unknown>>;
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

  return (
    <Row>
      <p
        className="table-button"
        style={{ cursor: "pointer" }}
        onClick={async () => {
          if (loggedIn) {
            actionOnLoggedIn(artwork_id)
              .then(() => {
                toast.success(toastSuccessMessage, {
                  className: "toast-success",
                });
              })
              .catch(() => {
                toast.error(toastErrorMessage, {
                  className: "toast-error",
                });
              });
          } else {
            if (actionOnNotLoggedIn) {
              try {
                actionOnNotLoggedIn();
                toast.success(toastSuccessMessage, {
                  className: "toast-success",
                });
              } catch {
                toast.error(toastErrorMessage, {
                  className: "toast-error",
                });
              }
            }
          }
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </p>
    </Row>
  );
}
export default SinglePurposeButton;
