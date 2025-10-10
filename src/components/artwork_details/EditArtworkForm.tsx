"use client";
import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

import { faDollarSign, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { TAG_SEPARATORS } from "@/utils/constants";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import ArtworkImagesInput from "@/components/input/artwork/ArtworkImagesInput";
import ArtworkThumbnailInput from "@/components/input/artwork/ArtworkThumbnailInput";
import ChangeArtworkDataInputComponent from "@/components/input/artwork/ChangeArtworkDataInputComponent";
import CategoryDropdownArtwork from "@/components/input/category_dropdown/CategoryDropdownArtwork";

import useEditArtworkForm from "./hooks/useEditArtworkForm";

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
    handleCategoryChange,
  } = useEditArtworkForm();

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
