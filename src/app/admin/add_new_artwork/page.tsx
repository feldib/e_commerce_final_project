"use client";
import React from "react";
import {
  Tag as ReactTagInputTag,
  WithContext as ReactTags,
} from "react-tag-input";

import { useRouter } from "next/navigation";

import {
  faAsterisk,
  faDollarSign,
  faImages,
  faQuestion,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";

import {
  MAX_IMAGE_SIZE,
  TAG_SEPARATORS,
  VALID_IMAGE_EXTENSIONS,
} from "@/utils/constants";
import {
  showErrorToast,
  showIncorrectDataToast,
  showSuccessToast,
} from "@/utils/toastUtils";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import NewArtworkInputComponent from "@/components/input/NewArtworkInputComponent";
import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

import { addNewArtwork } from "@/fetching/fetching";
import { Category } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

interface AddNewArtworkFormValues extends Record<string, unknown> {
  title: string;
  artist_name: string;
  price: number;
  tags: ReactTagInputTag[];
  quantity: number;
  category_id: number;
  thumbnail: Blob | undefined;
  other_pictures: Blob[];
  description: string;
}

function AddNewArtworkPage() {
  const { t } = useI18n();
  const categories = useAxios("/categories") as Category[];

  const categoriesRepresented = useLoading(categories, (categories) => {
    return (
      <>
        {categories.map((cat: Category, index: number) => (
          <Dropdown.Item eventKey={JSON.stringify(cat)} key={index}>
            {cat.cname}
          </Dropdown.Item>
        ))}
      </>
    );
  });

  const router = useRouter();

  function isValidImage(fileName: string): boolean {
    if (!fileName) return false;
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    return VALID_IMAGE_EXTENSIONS.includes(
      ext as (typeof VALID_IMAGE_EXTENSIONS)[number]
    );
  }

  const formik = useFormik<AddNewArtworkFormValues>({
    initialValues: {
      title: "",
      artist_name: "",
      price: 0,
      tags: [],
      quantity: 0,
      category_id: 0,
      thumbnail: undefined,
      other_pictures: [],
      description: "",
    },

    onSubmit: async (values, actions) => {
      const tags = values.tags.map((obj) => obj.text);

      try {
        // TypeScript check - thumbnail is required by validation but type allows undefined
        if (!values.thumbnail) {
          showErrorToast(t("validation.thumbnail_required"));
          return;
        }

        const response = await addNewArtwork({
          ...values,
          tags,
          thumbnail: values.thumbnail,
        });
        showSuccessToast(t("toast.artwork_added_successfully"));

        const artwork_id = response.data;

        router.push(`/artwork_page/${artwork_id}`);

        actions.resetForm();
      } catch {
        showErrorToast(t("toast.error_add_artwork"));
      }
    },

    validationSchema: Yup.object().shape({
      title: Yup.string().required(t("validation.title_required")),
      artist_name: Yup.string().required(t("validation.name_required")),
      price: Yup.number().required(t("validation.price_required")).min(1),
      quantity: Yup.number().required(t("validation.quantity_required")).min(1),
      category_id: Yup.number().required(t("validation.category_required")),
      thumbnail: Yup.mixed()
        .required(t("validation.thumbnail_required"))
        .test("is-valid-type", t("validation.not_valid_image_type"), (value) =>
          isValidImage(value instanceof File ? value.name : "")
        )
        .test(
          "is-valid-size",
          t("validation.max_allowed_size"),
          (value) => value instanceof File && value.size <= MAX_IMAGE_SIZE
        ),
      tags: Yup.array()
        .min(3, t("validation.add_minimum_tags"))
        .of(
          Yup.object().shape({
            id: Yup.string(),
            text: Yup.string(),
          })
        ),
      other_pictures: Yup.array().of(
        Yup.mixed()
          .test(
            "is-valid-type",
            t("validation.not_valid_image_type"),
            (value) => isValidImage(value instanceof File ? value.name : "")
          )
          .test(
            "is-valid-size",
            t("validation.max_allowed_size"),
            (value) => value instanceof File && value.size <= MAX_IMAGE_SIZE
          )
      ),
    }),
  });

  const [tags, setTags] = React.useState<ReactTagInputTag[]>([]);

  React.useEffect(() => {
    formik.setFieldValue("tags", tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const createHandleDelete = (
    tgs: ReactTagInputTag[],
    setTgs: React.Dispatch<React.SetStateAction<ReactTagInputTag[]>>
  ) => {
    return (i: number) => {
      setTgs(tgs.filter((tag, index) => index !== i));
    };
  };

  const createHandleAddition = (
    tgs: ReactTagInputTag[],
    setTgs: React.Dispatch<React.SetStateAction<ReactTagInputTag[]>>
  ) => {
    return (tag: ReactTagInputTag) => {
      setTgs([...tgs, tag]);
    };
  };

  const [chosenCategory, setChoseCategory] = React.useState("Choose");

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
              <Dropdown
                onSelect={(cat) => {
                  if (cat) {
                    const obj = JSON.parse(cat);
                    formik.setFieldValue("category_id", obj.id);
                    setChoseCategory(obj.cname);
                  }
                }}
              >
                <Dropdown.Toggle variant="outilne-dark">
                  {chosenCategory === "Choose"
                    ? t("common.choose")
                    : chosenCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>{categoriesRepresented}</Dropdown.Menu>
              </Dropdown>
              {formik.errors.category_id && (
                <div className="input-error-message">
                  {formik.errors.category_id}
                </div>
              )}
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label>{t("common.thumbnail")}</Form.Label>
              {formik.errors.thumbnail && (
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
                  placeholder={t("app.admin.add_new_artwork.upload_thumbnail")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.files) {
                      formik.setFieldValue(
                        "thumbnail",
                        e.currentTarget.files[0]
                      );
                    }
                  }}
                />
              </InputGroup>

              {formik.values.thumbnail && (
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
                    src={URL.createObjectURL(formik.values.thumbnail)}
                    className="mt-3 uploaded-thumbnail"
                    alt={t("app.admin.add_new_artwork.uploaded_thumbnail")}
                  />

                  <FontAwesomeIcon
                    icon={faX}
                    className="remove-uploaded-image"
                    onClick={() => {
                      formik.setFieldValue("thumbnail", "");
                    }}
                  />
                </Col>
              )}

              {formik.errors.thumbnail}
            </Form.Group>

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
                  placeholder={t(
                    "app.admin.add_new_artwork.upload_other_pictures"
                  )}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.files) {
                      formik.setFieldValue("other_pictures", [
                        ...formik.values.other_pictures,
                        e.currentTarget.files[0],
                      ]);
                    }
                  }}
                />
              </InputGroup>

              {formik.values.other_pictures && (
                <Row>
                  {formik.values.other_pictures.map((pic, index) => {
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
                          src={URL.createObjectURL(pic)}
                          className="mt-3 uploaded-image"
                          alt={t(
                            "app.admin.add_new_artwork.uploaded_other_picture"
                          )}
                        />

                        <FontAwesomeIcon
                          icon={faX}
                          className="remove-uploaded-image"
                          onClick={() => {
                            const newArray = formik.values.other_pictures;
                            newArray.splice(index);

                            formik.setFieldValue("other_pictures", newArray);
                          }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              )}

              {formik.errors.other_pictures as string}
            </Form.Group>

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
                  showIncorrectDataToast();
                }
              }}
            >
              {t("app.admin.add_new_artwork.add_new_artwork")}
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
