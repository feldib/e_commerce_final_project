"use client";
import React from "react";
import ChangeArtworkDataInputComponent from "@/components/input/ChangeArtworkDataInputComponent";
import {
  Container,
  Col,
  Row,
  Form,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import {
  faAsterisk,
  faDollarSign,
  faQuestion,
  faImages,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import PageTitle from "@/components/PageTitle";
import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";
import { useRouter, useParams } from "next/navigation";
import { WithContext as ReactTags, Tag as ReactTag } from "react-tag-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { server_url } from "@/utils/apiConstants";
import {
  addNewOtherPicture,
  replaceThumbnail,
  removePicture,
  updateArtworkData,
} from "@/fetching/fetching";
import { Category, Artwork } from "@/fetching/types";
import {
  MAX_IMAGE_SIZE,
  TAG_DELIMITERS,
  VALID_IMAGE_EXTENSIONS,
} from "@/utils/constants";

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
    return VALID_IMAGE_EXTENSIONS.includes(ext);
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
      thumbnail: Yup.mixed()
        .required("Thumbnail required")
        .test("is-valid-type", "Not a valid image type", (value) =>
          isValidImage(value instanceof File ? value.name : "")
        )
        .test(
          "is-valid-size",
          "Max allowed size is 100KB",
          (value) => value instanceof File && value.size <= MAX_IMAGE_SIZE
        ),
      tags: Yup.array()
        .min(3, "Add minimum 3 tags!")
        .of(
          Yup.object().shape({
            id: Yup.string(),
            text: Yup.string(),
          })
        ),
      other_pictures: Yup.array().of(
        Yup.mixed()
          .test("is-valid-type", "Not a valid image type", (value) =>
            isValidImage(value instanceof File ? value.name : "")
          )
          .test(
            "is-valid-size",
            "Max allowed size is 100KB",
            (value) => value instanceof File && value.size <= MAX_IMAGE_SIZE
          )
      ),
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
        thumbnail: `${server_url}/${artworkData.thumbnail}`,
        other_pictures:
          artworkData.other_pictures?.map((pic: string) => {
            return `${server_url}/${pic}`;
          }) || [],
        description: artworkData.description || "",
      });
      setTags(transformedTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artworkData]);

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
                delimiters={TAG_DELIMITERS}
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
                onSelect={(cat) => {
                  if (cat) {
                    const obj = JSON.parse(cat);
                    formik.setFieldValue("category_id", obj.id);
                    setChoseCategory(obj.cname);
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
                    if (files) {
                      await replaceThumbnail(artworkId, files[0]);
                      formik.setFieldValue(
                        "thumbnail",
                        URL.createObjectURL(files[0])
                      );
                    }
                  }}
                />
              </InputGroup>

              {formik.values.thumbnail && (
                <Col
                  className="mb-3 uploaded-image-container"
                  style={{
                    position: "relative",
                    height: "150px",
                    width: "150px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formik.values.thumbnail}
                    className="mt-3 uploaded-image"
                    alt="Uploaded thumbnail"
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
                    if (files) {
                      await addNewOtherPicture(artworkId, files[0]);

                      formik.setFieldValue("other_pictures", [
                        ...formik.values.other_pictures,
                        URL.createObjectURL(files[0]),
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
                          src={pic}
                          alt="Uploaded other picture"
                          className="mt-3 uploaded-image"
                        />

                        <FontAwesomeIcon
                          icon={faX}
                          className="remove-uploaded-image"
                          id={pic}
                          onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                            const id = (e.target as SVGSVGElement).id;
                            const indexOfPicToRemove =
                              formik.values.other_pictures.findIndex((pic) => {
                                return pic === id;
                              });

                            const newArray =
                              formik.values.other_pictures.filter(
                                (pic, index) => {
                                  return index !== indexOfPicToRemove;
                                }
                              );

                            removePicture(artworkId, id.split("/").pop() || "");

                            formik.setFieldValue("other_pictures", newArray);
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
