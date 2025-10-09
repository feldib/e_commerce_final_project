"use client";
import React from "react";

import { faImages, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, InputGroup } from "react-bootstrap";
import { FormikProps } from "formik";

import { showSuccessToast } from "@/utils/toastUtils";

import ErrorAsterisk from "@/components/input/ErrorAsterisk";

import { replaceThumbnail } from "@/fetching/fetching";

import { useI18n } from "../../providers/I18nProvider";

import { validateNewFile } from "@/helpers/fileValidation";

type ArtworkThumbnailInputProps<T extends Record<string, unknown>> = {
  formik: FormikProps<T>;
  label: string;
} & (
  | {
      isEdit: true;
      artworkId: number; // Required when editing
    }
  | {
      isEdit?: false;
      artworkId?: never; // Not allowed when adding
    }
);

function ArtworkThumbnailInput<T extends Record<string, unknown>>({
  formik,
  isEdit = false,
  artworkId,
  label,
}: ArtworkThumbnailInputProps<T>) {
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

  return (
    <Form.Group className="pb-3">
      <Form.Label>{label}</Form.Label>
      <ErrorAsterisk
        show={!!(formik.errors.thumbnail && formik.touched.thumbnail)}
      />
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon className="mx-3" icon={faImages} />
        </InputGroup.Text>

        <Form.Control
          onChange={handleFileChange}
          placeholder={t("common.actions.upload_thumbnail")}
          type="file"
        />
      </InputGroup>

      {(formik.values.thumbnail as string | Blob | null | undefined) && (
        <Col
          className="mb-3 uploaded-thumbnail-container"
          style={{
            position: "relative",
            height: "150px",
            width: "150px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={t(
              isEdit
                ? "app.admin.edit_artwork.current_thumbnail"
                : "app.admin.add_new_artwork.uploaded_thumbnail"
            )}
            className="mt-3 uploaded-thumbnail"
            src={
              typeof formik.values.thumbnail === "string"
                ? formik.values.thumbnail
                : URL.createObjectURL(formik.values.thumbnail as Blob)
            }
          />

          {!isEdit && (
            <FontAwesomeIcon
              className="remove-uploaded-image"
              icon={faX}
              onClick={handleRemoveThumbnail}
            />
          )}
        </Col>
      )}

      {formik.errors.thumbnail && formik.touched.thumbnail && (
        <div className="text-danger small mt-1">
          {formik.errors.thumbnail as string}
        </div>
      )}
    </Form.Group>
  );
}

export default ArtworkThumbnailInput;
