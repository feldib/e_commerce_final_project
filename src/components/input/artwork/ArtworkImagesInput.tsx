"use client";
import React from "react";

import { faImages, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { FormikProps } from "formik";

import { SERVER_URL } from "@/utils/constants";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";

import ErrorAsterisk from "@/components/input/ErrorAsterisk";
import { useI18n } from "@/components/providers/I18nProvider";

import { addNewOtherPicture, removePicture } from "@/fetching/fetching";

import { validateNewFile } from "@/helpers/fileValidation";

interface ArtworkImagesInputProps<T extends Record<string, unknown>> {
  formik: FormikProps<T>;
  isEdit?: boolean;
  artworkId?: number;
  label: string;
}

function ArtworkImagesInput<T extends Record<string, unknown>>({
  formik,
  isEdit = false,
  artworkId,
  label,
}: ArtworkImagesInputProps<T>) {
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
          if (artworkId) {
            await addNewOtherPicture(artworkId, file);
            formik.setFieldValue("other_pictures", [
              ...(formik.values.other_pictures as string[]),
              URL.createObjectURL(file),
            ]);
            e.target.value = ""; // Reset the input for next upload
            showSuccessToast(
              t("app.admin.edit_artwork.image_uploaded_successfully")
            );
          }
        } catch {
          showErrorToast(t("app.admin.edit_artwork.failed_to_upload_image"));
          e.target.value = ""; // Reset the input
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
          // This is an existing image from server, remove it
          const fileName = pic.split("/").pop() || "";
          if (artworkId) {
            await removePicture(artworkId, fileName);
          }
        }

        // Remove from the form state
        const newArray = (
          formik.values.other_pictures as (string | Blob)[]
        ).filter((_, picIndex) => picIndex !== index);
        formik.setFieldValue("other_pictures", newArray);
      } catch {
        showErrorToast(t("app.admin.edit_artwork.failed_to_remove_image"));
      }
    } else {
      // In add mode, we just remove the file from the array
      const newArray = [...(formik.values.other_pictures as Blob[])];
      newArray.splice(index, 1);
      formik.setFieldValue("other_pictures", newArray);
    }
  };

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
          placeholder={t("app.admin.add_new_artwork.upload_other_pictures")}
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
