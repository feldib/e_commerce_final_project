"use client";

import React from "react";

import { FormikProps } from "formik";

import {
  showChangesSavedToast,
  showDataSaveErrorToast,
  showIncorrectDataToast,
} from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { updateArtworkData } from "@/fetching/artwork";

import { preventNonNumericInput } from "@/helpers/inputHelpers";

type UseChangeArtworkDataInputProps<T extends Record<string, unknown>> = {
  formik: FormikProps<T>;
  name: string & keyof T;
  artwork_id: number;
  type: string;
};

type UseChangeArtworkDataInputReturn = {
  editing: boolean;
  showAsterisk: boolean;
  handleSave: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  handleEdit: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

function useChangeArtworkDataInput<T extends Record<string, unknown>>({
  formik,
  name,
  artwork_id,
  type,
}: UseChangeArtworkDataInputProps<T>): UseChangeArtworkDataInputReturn {
  const { t } = useI18n();
  const showAsterisk = formik.errors[name] && formik.touched[name];
  const [editing, setEditing] = React.useState(false);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Only check for errors in the current field being updated, not the entire form
    const currentFieldError = formik.errors[name];
    const hasCurrentFieldError = currentFieldError && formik.touched[name];

    if (hasCurrentFieldError) {
      showIncorrectDataToast(t);
    } else {
      try {
        await updateArtworkData(
          artwork_id,
          name,
          String(formik.values[name] || "")
        );
        showChangesSavedToast(t);
        setEditing(false);
      } catch {
        showDataSaveErrorToast(t);
      }
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      preventNonNumericInput(e);
    }
  };

  return {
    editing,
    showAsterisk: !!showAsterisk,
    handleSave,
    handleEdit,
    handleKeyDown,
  };
}

export default useChangeArtworkDataInput;
