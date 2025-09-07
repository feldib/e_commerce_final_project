"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type SinglePurposeButtonProps = {
  artwork_id: number;
  actionOnLoggedIn: (artwork_id: number) => Promise<Axios.AxiosXHR<unknown>>;
  actionOnNotLoggedIn?: () => void;
  toastSuccessMessage: string;
  toastErrorMessage: string;
  icon: IconDefinition;
};

function SinglePurposeButton(props: SinglePurposeButtonProps) {
  const { loggedIn } = React.useContext(UserDataContext);

  return (
    <Row>
      <p
        className="table-button"
        style={{ cursor: "pointer" }}
        onClick={async () => {
          if (loggedIn) {
            props
              .actionOnLoggedIn(props.artwork_id)
              .then(() => {
                toast.success(props.toastSuccessMessage, {
                  className: "toast-success",
                });
              })
              .catch(() => {
                toast.error(props.toastErrorMessage, {
                  className: "toast-error",
                });
              });
          } else {
            if (props.actionOnNotLoggedIn) {
              try {
                props.actionOnNotLoggedIn();
                toast.success(props.toastSuccessMessage, {
                  className: "toast-success",
                });
              } catch {
                toast.error(props.toastErrorMessage, {
                  className: "toast-error",
                });
              }
            }
          }
        }}
      >
        <FontAwesomeIcon icon={props.icon} />
      </p>
    </Row>
  );
}
export default SinglePurposeButton;
