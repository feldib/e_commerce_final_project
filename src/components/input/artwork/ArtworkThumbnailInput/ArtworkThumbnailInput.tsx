"use client";
import React from "react";

import { faImages, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, InputGroup } from "react-bootstrap";
import { FormikProps } from "formik";

import ErrorAsterisk from "@/components/input/ErrorAsterisk/ErrorAsterisk";

import useArtworkThumbnailInput from "./useArtworkThumbnailInput";

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
  const { handleFileChange, handleRemoveThumbnail, t } =
    useArtworkThumbnailInput({
      formik,
      isEdit,
      artworkId,
    });

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
