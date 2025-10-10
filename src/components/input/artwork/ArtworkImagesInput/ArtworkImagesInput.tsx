"use client";
import React from "react";

import { faImages, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { FormikProps } from "formik";

import ErrorAsterisk from "@/components/input/ErrorAsterisk/ErrorAsterisk";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import useArtworkImagesInput from "./useArtworkImagesInput";

type ArtworkImagesInputProps<T extends Record<string, unknown>> = {
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

function ArtworkImagesInput<T extends Record<string, unknown>>({
  formik,
  isEdit = false,
  artworkId,
  label,
}: ArtworkImagesInputProps<T>) {
  const { handleFileChange, handleRemoveImage, t } = useArtworkImagesInput({
    formik,
    isEdit,
    artworkId,
  });

  return (
    <Form.Group className="pb-3">
      <Form.Label>{label}</Form.Label>
      <ErrorAsterisk show={!!formik.errors.other_pictures} />
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon className="mx-3" icon={faImages} />
        </InputGroup.Text>

        <Form.Control
          onChange={handleFileChange}
          placeholder={t("common.actions.upload_other_pictures")}
          type="file"
        />
      </InputGroup>

      {formik.values.other_pictures !== undefined &&
        Array.isArray(formik.values.other_pictures) &&
        formik.values.other_pictures.length > 0 && (
          <Row>
            {(formik.values.other_pictures as Array<string | Blob>).map(
              (pic, index) => {
                return (
                  <Col
                    className="mb-3 uploaded-image-container"
                    key={index}
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
                          ? "app.admin.edit_artwork.current_image"
                          : "app.admin.add_new_artwork.uploaded_other_picture"
                      )}
                      className="mt-3 uploaded-image"
                      src={
                        typeof pic === "string"
                          ? pic
                          : URL.createObjectURL(pic as Blob)
                      }
                    />

                    <FontAwesomeIcon
                      className="remove-uploaded-image"
                      icon={faX}
                      onClick={() => handleRemoveImage(index, pic)}
                    />
                  </Col>
                );
              }
            )}
          </Row>
        )}

      {formik.errors.other_pictures && (
        <div className="text-danger small mt-1">
          {formik.errors.other_pictures as string}
        </div>
      )}
    </Form.Group>
  );
}

export default ArtworkImagesInput;
