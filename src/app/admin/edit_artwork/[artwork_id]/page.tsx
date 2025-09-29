"use client";
import React from "react";
import { Tag as ReactTag, WithContext as ReactTags } from "react-tag-input";

import { useParams, useRouter } from "next/navigation";

import {
  faAsterisk,
  faDollarSign,
  faImages,
  faQuestion,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
  SERVER_URL,
  TAG_SEPARATORS,
  VALID_IMAGE_EXTENSIONS,
} from "@/utils/constants";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import ChangeArtworkDataInputComponent from "@/components/input/ChangeArtworkDataInputComponent";
import PageTitle from "@/components/PageTitle";

import {
  addNewOtherPicture,
  removePicture,
  replaceThumbnail,
  updateArtworkData,
} from "@/fetching/fetching";
import { Artwork, Category } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

interface EditArtworkFormValues extends Record<string, unknown> {
  title: string;
  artist_name: string;
  price: string;
  tags: ReactTag[];
  quantity: string;
  category_id: string;
  thumbnail: string;
  other_pictures: string[];
  description: string;
}

function EditArtworkData() {
  const { artwork_id: artworkIdString } = useParams();
  const artworkId = Number(artworkIdString);
  const artworkData = useAxios(`/artwork?id=${artworkId}`) as Artwork;

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

  function validateNewFile(file: File): string | null {
    if (!isValidImage(file.name)) {
      return "Not a valid image type";
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return "Max allowed size is 100KB";
    }
    return null;
  }

  const formik = useFormik<EditArtworkFormValues>({
    initialValues: {
      title: "",
      artist_name: "",
      price: "",
      tags: [] as ReactTag[],
      quantity: "",
      category_id: "",
      thumbnail: "",
      other_pictures: [] as string[],
      description: "",
    },

    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title required"),
      artist_name: Yup.string().required("Name required"),
      price: Yup.number().required("Price required").min(1),
      quantity: Yup.number().required("Quantity required").min(1),
      category_id: Yup.number().required("Category required"),
      thumbnail: Yup.mixed().required("Thumbnail required"),
      tags: Yup.array()
        .min(3, "Add minimum 3 tags!")
        .of(
          Yup.object().shape({
            id: Yup.string(),
            text: Yup.string(),
          })
        ),
      other_pictures: Yup.array(),
      description: Yup.string().required("Description required"),
    }),
    onSubmit: () => {
      // there is no single submission
      return;
    },
  });

  const [tags, setTags] = React.useState<ReactTag[]>([]);

  React.useEffect(() => {
    if (artworkData) {
      const transformedTags =
        artworkData.tags?.map((obj: { tname: string }) => ({
          id: obj.tname,
          text: obj.tname,
          className: "",
        })) || [];

      formik.setValues({
        title: artworkData.title,
        artist_name: artworkData.artist_name,
        price: artworkData.price.toString(),
        tags: transformedTags,
        quantity: artworkData.quantity.toString(),
        category_id: artworkData.category_id.toString(),
        thumbnail: `${SERVER_URL}/${artworkData.thumbnail}`,
        other_pictures:
          artworkData.other_pictures?.map((pic: string) => {
            return `${SERVER_URL}/${pic}`;
          }) || [],
        description: artworkData.description || "",
      });
      setTags(transformedTags);

      const currentCategory = categories?.find(
        (cat: Category) => cat.id === artworkData.category_id
      );
      if (currentCategory) {
        setChoseCategory(currentCategory.cname);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artworkData, categories]);

  const [initialTagsLoaded, setInitialTagsLoaded] = React.useState(false);

  React.useEffect(() => {
    formik.setFieldValue("tags", tags);
    // Only update server if this is not the initial load and tags have actually changed
    if (initialTagsLoaded && tags.length >= 3) {
      updateArtworkData(
        artworkId,
        "tags",
        tags.map((tag: ReactTag) => {
          return { tname: tag.text };
        })
      );
    }
    // Mark that initial tags have been loaded after first render
    if (!initialTagsLoaded && tags.length > 0) {
      setInitialTagsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, artworkId]);

  const createHandleDelete = (
    tgs: ReactTag[],
    setTgs: React.Dispatch<React.SetStateAction<ReactTag[]>>
  ) => {
    return (i: number) => {
      setTgs(tgs.filter((_, index) => index !== i));
    };
  };

  const createHandleAddition = (
    tgs: ReactTag[],
    setTgs: React.Dispatch<React.SetStateAction<ReactTag[]>>
  ) => {
    return (tag: ReactTag) => {
      setTgs([...tgs, tag]);
    };
  };

  const [chosenCategory, setChoseCategory] = React.useState("Choose");

  return (
    <Container className="px-3">
      <PageTitle title="Edit artwork data" />
      <Row className="mx-auto pb-5 floating-element">
        <Col className="mx-5 pb-5 ">
          <Form>
            <ChangeArtworkDataInputComponent
              label="Title"
              name="title"
              type="text"
              placeholder="Enter title"
              icon={faQuestion}
              formik={formik}
              artwork_id={artworkId}
            />

            <ChangeArtworkDataInputComponent
              label="Artist"
              name="artist_name"
              type="text"
              placeholder="Enter name of artist"
              icon={faQuestion}
              formik={formik}
              artwork_id={artworkId}
            />

            <ChangeArtworkDataInputComponent
              label="Price"
              name="price"
              type="number"
              placeholder="Enter price of artwork"
              icon={faDollarSign}
              formik={formik}
              artwork_id={artworkId}
            />

            <Form.Group className="pb-3">
              <Form.Label>Tags</Form.Label>
              <ReactTags
                tags={formik.values.tags}
                // suggestions={suggestions}
                separators={[...TAG_SEPARATORS]}
                handleDelete={createHandleDelete(tags, setTags)}
                handleAddition={createHandleAddition(tags, setTags)}
                inputFieldPosition="bottom"
                placeholder="Add new tag"
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
              placeholder="Enter quantity"
              icon={faQuestion}
              formik={formik}
              artwork_id={artworkId}
            />

            <Form.Group className="pb-3">
              <Form.Label>Category</Form.Label>
              <Dropdown
                onSelect={async (cat) => {
                  if (cat) {
                    const obj = JSON.parse(cat);
                    formik.setFieldValue("category_id", obj.id);
                    setChoseCategory(obj.cname);

                    try {
                      await updateArtworkData(artworkId, "category_id", obj.id);
                      showSuccessToast("Category updated successfully");
                    } catch {
                      showErrorToast("Failed to update category");
                    }
                  }
                }}
              >
                <Dropdown.Toggle variant="outilne-dark">
                  {chosenCategory}
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
              <Form.Label>Thumbnail</Form.Label>
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
                  placeholder="Upload thumbnail"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      const file = files[0];
                      const validationError = validateNewFile(file);

                      if (validationError) {
                        alert(validationError);
                        e.target.value = ""; // Reset the input
                        return;
                      }

                      try {
                        await replaceThumbnail(artworkId, file);
                        formik.setFieldValue(
                          "thumbnail",
                          URL.createObjectURL(file)
                        );
                        showSuccessToast("Thumbnail uploaded successfully");
                      } catch {
                        showErrorToast("Failed to upload thumbnail");
                        e.target.value = ""; // Reset the input
                      }
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
                    src={formik.values.thumbnail}
                    className="mt-3 uploaded-thumbnail"
                    alt="Current thumbnail"
                  />
                </Col>
              )}

              {formik.errors.thumbnail}
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label>Images</Form.Label>
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
                  placeholder="Upload other pictures"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      const file = files[0];
                      const validationError = validateNewFile(file);

                      if (validationError) {
                        alert(validationError);
                        e.target.value = ""; // Reset the input
                        return;
                      }

                      try {
                        await addNewOtherPicture(artworkId, file);
                        formik.setFieldValue("other_pictures", [
                          ...formik.values.other_pictures,
                          URL.createObjectURL(file),
                        ]);
                        e.target.value = ""; // Reset the input for next upload
                        showSuccessToast("Image uploaded successfully");
                      } catch {
                        showErrorToast("Failed to upload image");
                        e.target.value = ""; // Reset the input
                      }
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
                          src={pic}
                          alt="Uploaded other picture"
                          className="mt-3 uploaded-image"
                        />

                        <FontAwesomeIcon
                          icon={faX}
                          className="remove-uploaded-image"
                          onClick={async () => {
                            try {
                              if (SERVER_URL && pic.startsWith(SERVER_URL)) {
                                // This is an existing image from server, remove it
                                const fileName = pic.split("/").pop() || "";
                                await removePicture(artworkId, fileName);
                              }

                              // Remove from the form state
                              const newArray =
                                formik.values.other_pictures.filter(
                                  (_, picIndex) => picIndex !== index
                                );
                              formik.setFieldValue("other_pictures", newArray);
                            } catch {
                              showErrorToast("Failed to remove image");
                            }
                          }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              )}

              {formik.errors.other_pictures}
            </Form.Group>

            <ChangeArtworkDataInputComponent
              label="Description"
              name="description"
              type="textarea"
              placeholder="Enter description"
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
