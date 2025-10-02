"use client";
import React from "react";

import { faAsterisk, faImages, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { FormikProps } from "formik";

import { SERVER_URL } from "@/utils/constants";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider";

import { addNewOtherPicture, removePicture } from "@/fetching/fetching";

import { validateNewFile } from "@/helpers/fileValidation";

interface ArtworkImagesInputProps<T extends Record<string, unknown>> {
  formik: FormikProps<T>;
  isEdit?: boolean;
  artworkId?: number;
}

function ArtworkImagesInput<T extends Record<string, unknown>>({
  formik,
  isEdit = false,
  artworkId,
}: ArtworkImagesInputProps<T>) {
  const { t } = useI18n();

  return (
    <Form.Group className="pb-3">
      <Form.Label>{t("common.images")}</Form.Label>
      {formik.errors.other_pictures && (
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
          placeholder={t("app.admin.add_new_artwork.upload_other_pictures")}
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
                  showErrorToast(
                    t("app.admin.edit_artwork.failed_to_upload_image")
                  );
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
          }}
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
                    key={index}
                    className="mb-3 uploaded-image-container"
                    style={{
                      position: "relative",
                      height: "150px",
                      width: "150px",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        typeof pic === "string"
                          ? pic
                          : URL.createObjectURL(pic as Blob)
                      }
                      alt={t(
                        "app.admin.add_new_artwork.uploaded_other_picture"
                      )}
                      className="mt-3 uploaded-image"
                    />

                    <FontAwesomeIcon
                      icon={faX}
                      className="remove-uploaded-image"
                      onClick={async () => {
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
                            showErrorToast(
                              t("app.admin.edit_artwork.failed_to_remove_image")
                            );
                          }
                        } else {
                          // In add mode, we just remove the file from the array
                          const newArray = [
                            ...(formik.values.other_pictures as Blob[]),
                          ];
                          newArray.splice(index, 1);
                          formik.setFieldValue("other_pictures", newArray);
                        }
                      }}
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
