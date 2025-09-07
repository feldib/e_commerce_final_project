"use client";
import React from "react";
import NewArtworkInputComponent from "../../../components/input/NewArtworkInputComponent";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import {
  faDollarSign,
  faQuestion,
  faImages,
  faAsterisk,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../../components/PageTitle";
import FloatingBackButton from "../../../components/buttons/FloatingBackButton";
import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";
import { useRouter } from "next/navigation";
import {
  WithContext as ReactTags,
  Tag as ReactTagInputTag,
} from "react-tag-input";
import {
  addNewThumbnail,
  addNewOtherPictures,
  addNewArtwork,
} from "@/fetching/fetching";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category } from "@/fetching/types";

function AddNewArtworkPage() {
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

  const MAX_IMAGE_SIZE = 102400; //100KB

  const validImageExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp"];

  function isValidImage(fileName: string): boolean {
    if (!fileName) return false;
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    return validImageExtensions.includes(ext);
  }

  const formik = useFormik<{
    title: string;
    artist_name: string;
    price: number;
    tags: ReactTagInputTag[];
    quantity: number;
    category_id: number;
    thumbnail: any;
    other_pictures: any[];
    description: string;
  }>({
    initialValues: {
      title: "",
      artist_name: "",
      price: 0,
      tags: [],
      quantity: 0,
      category_id: 0,
      thumbnail: "",
      other_pictures: [],
      description: "",
    },

    onSubmit: (values, actions) => {
      const tags = values.tags.map((obj) => obj.text);

      addNewArtwork({ ...values, tags })
        .then(async (response) => {
          toast.success("Artwork added successfully to database", {
            className: "toast-success",
          });

          const artwork_id = response.data;

          await addNewThumbnail(artwork_id, values.thumbnail);

          await addNewOtherPictures(artwork_id, values.other_pictures);

          actions.resetForm();
        })
        .catch((error) => {
          toast.error("Error: could not add artwork.", {
            className: "toast-error",
          });
          console.log(error);
        });
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
    }),
  });

  const KeyCodes = {
    comma: 188,
    enter: 13,
    space: 32,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

  const [tags, setTags] = React.useState<ReactTagInputTag[]>([]);

  React.useEffect(() => {
    formik.setFieldValue("tags", tags);
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
      <PageTitle title="Add new artwork" />
      <Row className="mx-auto pb-5 floating-element">
        <Col className="mx-5 pb-5 ">
          <Form onSubmit={formik.handleSubmit}>
            <NewArtworkInputComponent
              label="Title"
              name="title"
              type="text"
              placeholder="Enter title"
              icon={faQuestion}
              formik={formik}
            />

            <NewArtworkInputComponent
              label="Artist"
              name="artist_name"
              type="text"
              placeholder="Enter name of artist"
              icon={faQuestion}
              formik={formik}
            />

            <NewArtworkInputComponent
              label="Price"
              name="price"
              type="number"
              placeholder="Enter price of artwork"
              icon={faDollarSign}
              formik={formik}
            />

            <Form.Group className="pb-3">
              <Form.Label>Tags</Form.Label>
              <ReactTags
                tags={formik.values.tags}
                // suggestions={suggestions}
                delimiters={delimiters}
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

            <NewArtworkInputComponent
              label="Quantity"
              name="quantity"
              type="number"
              placeholder="Enter quantity"
              icon={faQuestion}
              formik={formik}
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
                  className="mb-3 uploaded-image-container"
                  style={{
                    position: "relative",
                    height: "150px",
                    width: "150px",
                  }}
                >
                  <img
                    src={URL.createObjectURL(formik.values.thumbnail)}
                    className="mt-3 uploaded-image"
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
                        <img
                          src={URL.createObjectURL(pic)}
                          className="mt-3 uploaded-image"
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
              label="Description"
              name="description"
              type="textarea"
              placeholder="Enter description"
              icon={faQuestion}
              formik={formik}
            />

            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                Object.keys(formik.errors).length &&
                  toast.error("Incorrect data", {
                    className: "toast-error",
                  });
              }}
            >
              Add new artwork
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
