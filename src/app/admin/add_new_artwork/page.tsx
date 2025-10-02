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
      <PageTitle title={t("app.admin.add_new_artwork.page_title")} />
      <Row className="mx-auto pb-5 floating-element">
        <Col className="mx-5 pb-5 ">
          <Form onSubmit={formik.handleSubmit}>
            <NewArtworkInputComponent
              label={t("common.title")}
              name="title"
              type="text"
              placeholder={t("app.admin.add_new_artwork.enter_title")}
              icon={faQuestion}
              formik={formik}
            />

            <NewArtworkInputComponent
              label={t("common.artist")}
              name="artist_name"
              type="text"
              placeholder={t("app.admin.add_new_artwork.enter_artist_name")}
              icon={faQuestion}
              formik={formik}
            />

            <NewArtworkInputComponent
              label={t("common.price")}
              name="price"
              type="number"
              placeholder={t("app.admin.add_new_artwork.enter_price")}
              icon={faDollarSign}
              formik={formik}
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

            <NewArtworkInputComponent
              label={t("common.quantity")}
              name="quantity"
              type="number"
              placeholder={t("app.admin.add_new_artwork.enter_quantity")}
              icon={faQuestion}
              formik={formik}
            />

            <Form.Group className="pb-3">
              <Form.Label>{t("common.category")}</Form.Label>
              <CategoryDropdownArtwork
                categories={categories}
                formik={formik}
                fieldName="category_id"
                required={true}
              />
            </Form.Group>

            <ArtworkThumbnailInput formik={formik} isEdit={false} />

            <ArtworkImagesInput formik={formik} isEdit={false} />

            <NewArtworkInputComponent
              label={t("common.description")}
              name="description"
              type="textarea"
              placeholder={t("app.admin.add_new_artwork.enter_description")}
              icon={faQuestion}
              formik={formik}
            />

            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                if (Object.keys(formik.errors).length) {
                  showIncorrectDataToast(t);
                }
              }}
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
