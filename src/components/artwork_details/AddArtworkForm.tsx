"use client";
import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

import { faDollarSign, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { TAG_SEPARATORS } from "@/utils/constants";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import ArtworkImagesInput from "@/components/input/artwork/ArtworkImagesInput";
import ArtworkThumbnailInput from "@/components/input/artwork/ArtworkThumbnailInput";
import NewArtworkInputComponent from "@/components/input/artwork/NewArtworkInputComponent";
import CategoryDropdownArtwork from "@/components/input/category_dropdown/CategoryDropdownArtwork";

import useAddArtworkForm from "./hooks/useAddArtworkForm";

function AddArtworkForm() {
  const {
    t,
    formik,
    tags,
    setTags,
    categories,
    router,
    createHandleDelete,
    createHandleAddition,
    handleSubmitClick,
  } = useAddArtworkForm();

  return (
    <Row className="mx-auto pb-5 floating-element">
      <Col className="mx-5 pb-5 ">
        <Form onSubmit={formik.handleSubmit}>
          <NewArtworkInputComponent
            formik={formik}
            icon={faQuestion}
            label={t("common.fields.title")}
            name="title"
            placeholder={t("common.placeholders.enter_title")}
            type="text"
          />

          <NewArtworkInputComponent
            formik={formik}
            icon={faQuestion}
            label={t("common.fields.artist")}
            name="artist_name"
            placeholder={t("common.placeholders.enter_artist_name")}
            type="text"
          />

          <NewArtworkInputComponent
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

          <NewArtworkInputComponent
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
          />

          <ArtworkThumbnailInput
            formik={formik}
            isEdit={false}
            label={t("common.fields.thumbnail")}
          />

          <ArtworkImagesInput
            formik={formik}
            isEdit={false}
            label={t("common.fields.images")}
          />

          <NewArtworkInputComponent
            formik={formik}
            icon={faQuestion}
            label={t("common.fields.description")}
            name="description"
            placeholder={t("common.placeholders.enter_description")}
            type="textarea"
          />

          <Button
            onClick={() => handleSubmitClick(formik.errors)}
            type="submit"
            variant="primary"
          >
            {t("common.actions.add_new_artwork")}
          </Button>
          <ToastContainer position="bottom-right" />
        </Form>
      </Col>

      <FloatingBackButton router={router} />
    </Row>
  );
}

export default AddArtworkForm;
