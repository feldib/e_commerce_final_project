"use client";

import React from "react";

import { FormikProps } from "formik";

import { showSuccessToast } from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { replaceThumbnail } from "@/fetching/images";

import { validateNewFile } from "@/helpers/fileValidation";

type UseArtworkThumbnailInputProps<T extends Record<string, unknown>> = {
  formik: FormikProps<T>;
  isEdit: boolean;
  artworkId?: number;
};

type UseArtworkThumbnailInputReturn = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRemoveThumbnail: () => void;
  t: (key: string) => string;
};

function useArtworkThumbnailInput<T extends Record<string, unknown>>({
  formik,
  isEdit,
  artworkId,
}: UseArtworkThumbnailInputProps<T>): UseArtworkThumbnailInputReturn {
  const { t } = useI18n();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];

      // Validate file in both edit and add modes
      const validationError = validateNewFile(file, t);

      if (validationError) {
        alert(validationError);
        e.target.value = ""; // Reset the input
        return;
      }

      // In edit mode, we need to validate and upload the file
      if (isEdit) {
        try {
          // TypeScript assertion: artworkId is guaranteed to be defined when isEdit is true
          await replaceThumbnail(artworkId as number, file);
          showSuccessToast(
            t("components.forms.artwork.thumbnail_uploaded_successfully")
          );
          // We create an object URL in both modes
          formik.setFieldValue("thumbnail", URL.createObjectURL(file));
        } catch {
          e.target.value = ""; // Reset the input
        }
      } else {
        // In add mode, we just set the file directly
        formik.setFieldValue("thumbnail", file);
      }
    }
  };

  const handleRemoveThumbnail = () => {
    formik.setFieldValue("thumbnail", "");
  };

  return {
    handleFileChange,
    handleRemoveThumbnail,
    t,
  };
}

export default useArtworkThumbnailInput;
