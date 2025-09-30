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
import { ErrorMessage, Field, Form, Formik } from "formik";

import {
  showIncorrectDataToast,
  showReviewErrorToast,
  showReviewSavedToast,
} from "@/utils/toastUtils";
import { reviewSchema } from "@/utils/validationSchemas";

import { useI18n } from "@/components/providers/I18nProvider";
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
  const { t } = useI18n();
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
                  <h4>{t("components.leave_review.add_review")}</h4>
                </RBForm.Label>

                {loggedIn ? (
                  <>
                    <InputComponent
                      label="Title"
                      name="title"
                      type="text"
                      placeholder={t(
                        "components.leave_review.enter_review_title"
                      )}
                      icon={faKeyboard}
                      showAsterisk={!!errors.title && !!touched.title}
                    />

                    <RBForm.Group className="mb-3">
                      <RBForm.Label>
                        {t("components.leave_review.message")}
                      </RBForm.Label>
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
                          placeholder={t(
                            "components.leave_review.enter_review_text"
                          )}
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
                  <p>{t("components.leave_review.login_required")}</p>
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
