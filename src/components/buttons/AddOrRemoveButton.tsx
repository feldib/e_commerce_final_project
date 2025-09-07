"use client";
import React from "react";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { UserDataContext } from "@/components/providers/UserDataProvider";

type AddOrRemoveFromButtonProps = {
  artwork_id: number;
  isAdded: (artwork_id: number) => Promise<boolean>;
  addToAdded: (artwork_id: number) => Promise<void>;
  removeFromAdded: (artwork_id: number) => Promise<void>;
  filledButton: React.ReactNode;
  regularButton: React.ReactNode;
  toastWarningMessage: string;
};

function AddOrRemoveFromButton(props: AddOrRemoveFromButtonProps) {
  const { loggedIn } = React.useContext(UserDataContext);

  const [added, setAdded] = React.useState(false);
  const [needsToBeRefreshed, setNeedsToBeRefreshed] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (loggedIn) {
        try {
          const isAddedOrNot = await props.isAdded(props.artwork_id);
          setAdded(isAddedOrNot);
        } catch {
          console.log("Not authenticated");
        }
      }
    })();
    if (needsToBeRefreshed) {
      setNeedsToBeRefreshed(false);
    }
  }, [needsToBeRefreshed]);

  return (
    <Row className="py-2">
      <span
        className="table-button"
        style={{ cursor: "pointer" }}
        onClick={async () => {
          if (loggedIn) {
            if (added) {
              await props.removeFromAdded(props.artwork_id);
              setNeedsToBeRefreshed(true);
            } else {
              await props.addToAdded(props.artwork_id);
              setNeedsToBeRefreshed(true);
            }
          } else {
            toast.warning(props.toastWarningMessage, {
              className: "toast-warning",
            });
          }
        }}
      >
        {added ? <>{props.filledButton}</> : <>{props.regularButton}</>}
      </span>
    </Row>
  );
}

export default AddOrRemoveFromButton;
