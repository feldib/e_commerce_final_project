"use client";

import React from "react";

import { FormikProps } from "formik";

import { SERVER_URL } from "@/utils/constants";
import { artworkToast } from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { addNewOtherPicture, removePicture } from "@/fetching/images";

import { validateNewFile } from "@/helpers/fileValidation";

type UseArtworkImagesInputProps<T extends Record<string, unknown>> = {
  formik: FormikProps<T>;
  isEdit: boolean;
  artworkId?: number;
};

type UseArtworkImagesInputReturn = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRemoveImage: (index: number, pic: string | Blob) => Promise<void>;
  t: (key: string) => string;
};

function useArtworkImagesInput<T extends Record<string, unknown>>({
  formik,
  isEdit,
  artworkId,
}: UseArtworkImagesInputProps<T>): UseArtworkImagesInputReturn {
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
          await addNewOtherPicture(artworkId as number, file);
          formik.setFieldValue("other_pictures", [
            ...(formik.values.other_pictures as string[]),
            URL.createObjectURL(file),
          ]);
          e.target.value = ""; // Reset the input for next upload
          artworkToast.imageUploadFailed(t);
        } catch {
          artworkToast.imageUploadFailed(t);
        }
      } else {
        // In add mode, we just set the file directly
        formik.setFieldValue("other_pictures", [
          ...(formik.values.other_pictures as Blob[]),
          file,
        ]);
      }
    }
  };

  const handleRemoveImage = async (index: number, pic: string | Blob) => {
    if (isEdit) {
      try {
        if (
          SERVER_URL &&
          typeof pic === "string" &&
          pic.startsWith(SERVER_URL)
        ) {
          const filename = pic.split("/").pop();
          await removePicture(artworkId as number, filename as string);
        }

        // Remove from the form state
        const newArray = (
          formik.values.other_pictures as (string | Blob)[]
        ).filter((_, picIndex) => picIndex !== index);
        formik.setFieldValue("other_pictures", newArray);
      } catch {
        artworkToast.imageRemoveFailed(t);
      }
    } else {
      // In add mode, we just remove the file from the array
      const newArray = [...(formik.values.other_pictures as Blob[])];
      newArray.splice(index, 1);
      formik.setFieldValue("other_pictures", newArray);
    }
  };

  return {
    handleFileChange,
    handleRemoveImage,
    t,
  };
}

export default useArtworkImagesInput;
