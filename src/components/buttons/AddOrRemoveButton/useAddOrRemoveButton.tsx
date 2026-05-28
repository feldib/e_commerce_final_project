"use client";

import React from "react";

import { Id } from "react-toastify/unstyled";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

type UseAddOrRemoveButtonProps = {
  artwork_id: number;
  isAdded: (artwork_id: number) => Promise<boolean>;
  addToAdded: (artwork_id: number) => Promise<void>;
  removeFromAdded: (artwork_id: number) => Promise<void>;
  warningToast: (t: (key: string) => string) => Id;
};

type UseAddOrRemoveButtonReturn = {
  added: boolean;
  handleButtonClick: () => Promise<void>;
};

function useAddOrRemoveButton({
  artwork_id,
  isAdded,
  addToAdded,
  removeFromAdded,
  warningToast,
}: UseAddOrRemoveButtonProps): UseAddOrRemoveButtonReturn {
  const { loggedIn } = React.useContext(UserDataContext);

  const [added, setAdded] = React.useState(false);
  const [needsToBeRefreshed, setNeedsToBeRefreshed] = React.useState(false);
  const { t } = useI18n();

  const handleButtonClick = async () => {
    if (loggedIn) {
      if (added) {
        await removeFromAdded(artwork_id);
        setNeedsToBeRefreshed(true);
      } else {
        await addToAdded(artwork_id);
        setNeedsToBeRefreshed(true);
      }
    } else {
      warningToast(t);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (loggedIn) {
        try {
          const isAddedOrNot = await isAdded(artwork_id);
          setAdded(isAddedOrNot);
        } catch {
          console.log("Not authenticated");
        }
      }
    })();
    if (needsToBeRefreshed) {
      setNeedsToBeRefreshed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsToBeRefreshed, artwork_id]);

  return {
    added,
    handleButtonClick,
  };
}

export default useAddOrRemoveButton;
