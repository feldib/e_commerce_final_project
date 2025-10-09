"use client";
import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

import { faDollarSign, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { TAG_SEPARATORS } from "@/utils/constants";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import ArtworkImagesInput from "@/components/input/artwork/ArtworkImagesInput";
import ArtworkThumbnailInput from "@/components/input/artwork/ArtworkThumbnailInput";
import ChangeArtworkDataInputComponent from "@/components/input/artwork/ChangeArtworkDataInputComponent";
import CategoryDropdownArtwork from "@/components/input/category_dropdown/CategoryDropdownArtwork";

import { updateArtworkData } from "@/fetching/fetching";

import useEditArtworkData from "../../app/admin/edit_artwork/[artwork_id]/useEditArtworkData";

function EditArtworkForm() {
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

  const handleCategoryChange = async (category: { id: number }) => {
    try {
      await updateArtworkData(artworkId, "category_id", category.id);
      showSuccessToast(
        t("components.forms.artwork.category_updated_successfully")
      );
    } catch {
      showErrorToast(t("components.forms.artwork.failed_to_update_category"));
    }
  };

  return (
    <Row className="mx-auto pb-5 floating-element">
      <Col className="mx-5 pb-5 ">
        <Form>
          <ChangeArtworkDataInputComponent
            artwork_id={artworkId}
            formik={formik}
            icon={faQuestion}
            label={t("common.fields.title")}
            name="title"
            placeholder={t("common.placeholders.enter_title")}
            type="text"
          />

          <ChangeArtworkDataInputComponent
            artwork_id={artworkId}
            formik={formik}
            icon={faQuestion}
            label={t("common.fields.artist")}
            name="artist_name"
            placeholder={t("common.placeholders.enter_artist_name")}
            type="text"
          />

          <ChangeArtworkDataInputComponent
            artwork_id={artworkId}
            formik={formik}
            icon={faDollarSign}
            label={t("common.fields.price")}
            name="price"
            placeholder={t("common.placeholders.enter_price")}
            type="number"
          />

          <Form.Group className="pb-3">
            <Form.Label>{t("common.fields.tags")}</Form.Label>
            <ReactTags
              handleAddition={createHandleAddition(tags, setTags)}
              handleDelete={createHandleDelete(tags, setTags)}
              inputFieldPosition="bottom"
              placeholder={t("common.actions.add_new_tag")}
              // suggestions={suggestions}
              separators={[...TAG_SEPARATORS]}
              tags={formik.values.tags}
              // autocomplete
            />
            {formik.errors.tags && (
              <div className="input-error-message">
                {formik.errors.tags as string}
              </div>
            )}
          </Form.Group>

          <ChangeArtworkDataInputComponent
            artwork_id={artworkId}
            formik={formik}
            icon={faQuestion}
            label={t("common.fields.quantity")}
            name="quantity"
            placeholder={t("common.placeholders.enter_quantity")}
            type="number"
          />

          <CategoryDropdownArtwork
            categories={categories}
            fieldName="category_id"
            formik={formik}
            label={t("common.fields.category")}
            onCategoryChange={handleCategoryChange}
          />

          <ArtworkThumbnailInput
            artworkId={artworkId}
            formik={formik}
            isEdit={true}
            label={t("common.fields.thumbnail")}
          />

          <ArtworkImagesInput
            artworkId={artworkId}
            formik={formik}
            isEdit={true}
            label={t("common.fields.images")}
          />

          <ChangeArtworkDataInputComponent
            artwork_id={artworkId}
            formik={formik}
            icon={faQuestion}
            label={t("common.fields.description")}
            name="description"
            placeholder={t("common.placeholders.enter_description")}
            type="textarea"
          />
          <ToastContainer position="bottom-right" />
        </Form>
      </Col>

      <FloatingBackButton router={router} />
    </Row>
  );
}

export default EditArtworkForm;
