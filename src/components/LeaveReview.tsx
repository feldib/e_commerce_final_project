"use client";
import React from "react";

import { faAsterisk, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Col,
  FloatingLabel,
  Form as RBForm,
  Row,
} from "react-bootstrap";
import { ErrorMessage,Field, Form, Formik } from "formik";

import {
  showIncorrectDataToast,
  showReviewErrorToast,
  showReviewSavedToast,
} from "@/utils/toastUtils";
import { reviewSchema } from "@/utils/validationSchemas";

import { UserDataContext } from "@/components/providers/UserDataProvider";

import { leaveReview } from "@/fetching/fetching";

import InputComponent from "./input/InputComponent";

type LeaveReviewProps = {
  artwork_id: number;
};

type ReviewFormValues = {
  title: string;
  review_text: string;
};

function LeaveReview({ artwork_id }: LeaveReviewProps) {
  const { loggedIn } = React.useContext(UserDataContext);

  const form = React.useRef<HTMLFormElement | null>(null);

  const initialValues: ReviewFormValues = {
    title: "",
    review_text: "",
  };

  const onSubmit = async (values: ReviewFormValues) => {
    try {
      await leaveReview(artwork_id, values.title, values.review_text);
      showReviewSavedToast();
      form?.current?.reset();
    } catch {
      showReviewErrorToast();
    }
  };

  return (
    <Row className="mx-5 mt-5 mb-5 floating-element">
      <Col>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={reviewSchema}
        >
          {({ errors, touched }) => (
            <Form ref={form}>
              <RBForm.Group className="mb-3">
                <RBForm.Label>
                  <h4>Add a review</h4>
                </RBForm.Label>

                {loggedIn ? (
                  <>
                    <InputComponent
                      label="Title"
                      name="title"
                      type="text"
                      placeholder="Enter review title"
                      icon={faKeyboard}
                      showAsterisk={!!errors.title && !!touched.title}
                    />

                    <RBForm.Group className="mb-3">
                      <RBForm.Label>Message</RBForm.Label>
                      {errors.review_text && touched.review_text && (
                        <FontAwesomeIcon
                          icon={faAsterisk}
                          style={{ color: "red" }}
                          className="mx-3"
                        />
                      )}
                      <FloatingLabel label="">
                        <Field
                          className="form-control"
                          name="review_text"
                          as="textarea"
                          placeholder="Enter review text"
                          style={{ height: "100px" }}
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        component="div"
                        className="input-error-message"
                        name="review_text"
                      />
                    </RBForm.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => {
                        if (Object.keys(errors).length) {
                          showIncorrectDataToast();
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </>
                ) : (
                  <p>You have to be logged in to leave a review!</p>
                )}
              </RBForm.Group>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
}

export default LeaveReview;
