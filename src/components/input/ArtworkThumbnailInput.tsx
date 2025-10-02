"use client";
import React from "react";

import { faAsterisk, faImages, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, InputGroup } from "react-bootstrap";
import { FormikProps } from "formik";

import { showSuccessToast } from "@/utils/toastUtils";

import { replaceThumbnail } from "@/fetching/fetching";

import { useI18n } from "../providers/I18nProvider";

import { validateNewFile } from "@/helpers/fileValidation";

interface ArtworkThumbnailInputProps<T extends Record<string, unknown>> {
  formik: FormikProps<T>;
  isEdit?: boolean;
  artworkId?: number;
  label: string;
}

function ArtworkThumbnailInput<T extends Record<string, unknown>>({
  formik,
  isEdit = false,
  artworkId,
  label,
}: ArtworkThumbnailInputProps<T>) {
  const { t } = useI18n();
  return (
    <Form.Group className="pb-3">
      <Form.Label>{label}</Form.Label>
      {formik.errors.thumbnail && (
        <FontAwesomeIcon
          icon={faAsterisk}
          style={{ color: "red" }}
          className="mx-3"
        />
      )}
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faImages} className="mx-3" />
        </InputGroup.Text>

        <Form.Control
          type="file"
          placeholder={t("app.admin.add_new_artwork.upload_thumbnail")}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files[0]) {
              const file = files[0];

              // In edit mode, we need to validate and upload the file
              if (isEdit) {
                const validationError = validateNewFile(file, t);

                if (validationError) {
                  alert(validationError);
                  e.target.value = ""; // Reset the input
                  return;
                }

                try {
                  if (artworkId) {
                    await replaceThumbnail(artworkId, file);
                    showSuccessToast(
                      t(
                        "app.admin.edit_artwork.thumbnail_uploaded_successfully"
                      )
                    );
                  }
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
          }}
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
            src={
              typeof formik.values.thumbnail === "string"
                ? formik.values.thumbnail
                : URL.createObjectURL(formik.values.thumbnail as Blob)
            }
            className="mt-3 uploaded-thumbnail"
            alt={t(
              isEdit
                ? "app.admin.edit_artwork.current_thumbnail"
                : "app.admin.add_new_artwork.uploaded_thumbnail"
            )}
          />

          {!isEdit && (
            <FontAwesomeIcon
              icon={faX}
              className="remove-uploaded-image"
              onClick={() => {
                formik.setFieldValue("thumbnail", "");
              }}
            />
          )}
        </Col>
      )}

      {formik.errors.thumbnail && (
        <div className="text-danger small mt-1">
          {formik.errors.thumbnail as string}
        </div>
      )}
    </Form.Group>
  );
}

export default ArtworkThumbnailInput;
