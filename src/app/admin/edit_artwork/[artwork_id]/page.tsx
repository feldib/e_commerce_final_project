"use client";
import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

import { faDollarSign, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { TAG_SEPARATORS } from "@/utils/constants";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import ArtworkImagesInput from "@/components/input/ArtworkImagesInput";
import ArtworkThumbnailInput from "@/components/input/ArtworkThumbnailInput";
import CategoryDropdownArtwork from "@/components/input/CategoryDropdownArtwork";
import ChangeArtworkDataInputComponent from "@/components/input/ChangeArtworkDataInputComponent";
import PageTitle from "@/components/PageTitle";

import { updateArtworkData } from "@/fetching/fetching";

import useEditArtworkData from "./useEditArtworkData";

function EditArtworkData() {
  const {
    formik,
    tags,
    setTags,
    createHandleDelete,
    createHandleAddition,
    categories,
    artworkId,
    t,
    router,
  } = useEditArtworkData();

  return (
    <Container className="px-3">
      <PageTitle title={t("app.admin.edit_artwork.title")} />
      <Row className="mx-auto pb-5 floating-element">
        <Col className="mx-5 pb-5 ">
          <Form>
            <ChangeArtworkDataInputComponent
              label="Title"
              name="title"
              type="text"
              placeholder={t("app.admin.add_new_artwork.enter_title")}
              icon={faQuestion}
              formik={formik}
              artwork_id={artworkId}
            />

            <ChangeArtworkDataInputComponent
              label="Artist"
              name="artist_name"
              type="text"
              placeholder={t("app.admin.add_new_artwork.enter_artist_name")}
              icon={faQuestion}
              formik={formik}
              artwork_id={artworkId}
            />

            <ChangeArtworkDataInputComponent
              label="Price"
              name="price"
              type="number"
              placeholder={t("app.admin.add_new_artwork.enter_price")}
              icon={faDollarSign}
              formik={formik}
              artwork_id={artworkId}
            />

            <Form.Group className="pb-3">
              <Form.Label>{t("common.tags")}</Form.Label>
              <ReactTags
                tags={formik.values.tags}
                // suggestions={suggestions}
                separators={[...TAG_SEPARATORS]}
                handleDelete={createHandleDelete(tags, setTags)}
                handleAddition={createHandleAddition(tags, setTags)}
                inputFieldPosition="bottom"
                placeholder={t("app.admin.add_new_artwork.add_new_tag")}
                // autocomplete
              />
              {formik.errors.tags && (
                <div className="input-error-message">
                  {formik.errors.tags as string}
                </div>
              )}
            </Form.Group>

            <ChangeArtworkDataInputComponent
              label="Quantity"
              name="quantity"
              type="number"
              placeholder={t("app.admin.add_new_artwork.enter_quantity")}
              icon={faQuestion}
              formik={formik}
              artwork_id={artworkId}
            />

            <Form.Group className="pb-3">
              <Form.Label>{t("common.category")}</Form.Label>
              <CategoryDropdownArtwork
                categories={categories}
                formik={formik}
                fieldName="category_id"
                required={true}
                onCategoryChange={async (category) => {
                  try {
                    await updateArtworkData(
                      artworkId,
                      "category_id",
                      category.id
                    );
                    showSuccessToast(
                      t("app.admin.edit_artwork.category_updated_successfully")
                    );
                  } catch {
                    showErrorToast(
                      t("app.admin.edit_artwork.failed_to_update_category")
                    );
                  }
                }}
              />
            </Form.Group>

            <ArtworkThumbnailInput
              formik={formik}
              isEdit={true}
              artworkId={artworkId}
            />

            <ArtworkImagesInput
              formik={formik}
              isEdit={true}
              artworkId={artworkId}
            />

            <ChangeArtworkDataInputComponent
              label="Description"
              name="description"
              type="textarea"
              placeholder={t("app.admin.add_new_artwork.enter_description")}
              icon={faQuestion}
              formik={formik}
              artwork_id={artworkId}
            />
            <ToastContainer position="bottom-right" />
          </Form>
        </Col>
      </Row>

      <FloatingBackButton router={router} />
    </Container>
  );
}

export default EditArtworkData;
