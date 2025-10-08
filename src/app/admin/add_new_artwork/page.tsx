"use client";
import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

import { faDollarSign, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { TAG_SEPARATORS } from "@/utils/constants";
import { showIncorrectDataToast } from "@/utils/toastUtils";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import ArtworkImagesInput from "@/components/input/ArtworkImagesInput";
import ArtworkThumbnailInput from "@/components/input/ArtworkThumbnailInput";
import CategoryDropdownArtwork from "@/components/input/CategoryDropdownArtwork";
import NewArtworkInputComponent from "@/components/input/NewArtworkInputComponent";
import PageTitle from "@/components/PageTitle";

import useAddNewArtworkPage from "./useAddNewArtworkPage";

function AddNewArtworkPage() {
  const {
    t,
    formik,
    tags,
    setTags,
    categories,
    router,
    createHandleDelete,
    createHandleAddition,
  } = useAddNewArtworkPage();
  return (
    <Container className="px-3">
      <PageTitle title={t("app.admin.add_new_artwork.title")} />
      <Row className="mx-auto pb-5 floating-element">
        <Col className="mx-5 pb-5 ">
          <Form onSubmit={formik.handleSubmit}>
            <NewArtworkInputComponent
              formik={formik}
              icon={faQuestion}
              label={t("common.title")}
              name="title"
              placeholder={t("app.admin.add_new_artwork.enter_title")}
              type="text"
            />

            <NewArtworkInputComponent
              formik={formik}
              icon={faQuestion}
              label={t("common.artist")}
              name="artist_name"
              placeholder={t("app.admin.add_new_artwork.enter_artist_name")}
              type="text"
            />

            <NewArtworkInputComponent
              formik={formik}
              icon={faDollarSign}
              label={t("common.price")}
              name="price"
              placeholder={t("app.admin.add_new_artwork.enter_price")}
              type="number"
            />

            <Form.Group className="pb-3">
              <Form.Label>{t("common.tags")}</Form.Label>
              <ReactTags
                handleAddition={createHandleAddition(tags, setTags)}
                handleDelete={createHandleDelete(tags, setTags)}
                inputFieldPosition="bottom"
                placeholder={t("app.admin.add_new_artwork.add_new_tag")}
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
              label={t("common.quantity")}
              name="quantity"
              placeholder={t("app.admin.add_new_artwork.enter_quantity")}
              type="number"
            />

            <CategoryDropdownArtwork
              categories={categories}
              fieldName="category_id"
              formik={formik}
              label={t("common.category")}
            />

            <ArtworkThumbnailInput
              formik={formik}
              isEdit={false}
              label={t("common.thumbnail")}
            />

            <ArtworkImagesInput
              formik={formik}
              isEdit={false}
              label={t("common.images")}
            />

            <NewArtworkInputComponent
              formik={formik}
              icon={faQuestion}
              label={t("common.description")}
              name="description"
              placeholder={t("app.admin.add_new_artwork.enter_description")}
              type="textarea"
            />

            <Button
              onClick={() => {
                if (Object.keys(formik.errors).length) {
                  showIncorrectDataToast(t);
                }
              }}
              type="submit"
              variant="primary"
            >
              {t("app.admin.artworks.add_new_artwork")}
            </Button>
            <ToastContainer position="bottom-right" />
          </Form>
        </Col>
      </Row>

      <FloatingBackButton router={router} />
    </Container>
  );
}

export default AddNewArtworkPage;
