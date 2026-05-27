"use client";
import React from "react";

import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Col,
  FloatingLabel,
  Form as RBForm,
  Row,
} from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";

import {
  reviewToast
} from "@/utils/toastUtils";

import ErrorAsterisk from "@/components/input/ErrorAsterisk/ErrorAsterisk";
import InputComponent from "@/components/input/InputComponent/InputComponent";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import { leaveReview } from "@/fetching/reviews";

import { createHandleSubmitClick } from "@/helpers/formValidationHelpers";
import { useReviewSchema } from "@/hooks/useValidationSchemas";

type LeaveReviewProps = {
  artwork_id: number;
};

type ReviewFormValues = {
  title: string;
  review_text: string;
};

function LeaveReview({ artwork_id }: LeaveReviewProps) {
  const { t } = useI18n();
  const reviewSchema = useReviewSchema();
  const { loggedIn } = React.useContext(UserDataContext);

  const form = React.useRef<HTMLFormElement | null>(null);

  const initialValues: ReviewFormValues = {
    title: "",
    review_text: "",
  };

  const onSubmit = async (values: ReviewFormValues) => {
    try {
      await leaveReview(artwork_id, values.title, values.review_text);
      reviewToast.saveSuccess(t);
      form?.current?.reset();
    } catch {
      reviewToast.saveError(t);
    }
  };

  const handleSubmitClick = createHandleSubmitClick(t);

  return (
    <>
      {loggedIn ? (
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

                    <InputComponent
                      hasError={!!errors.title && !!touched.title}
                      icon={faKeyboard}
                      label="Title"
                      name="title"
                      placeholder={t(
                        "components.leave_review.enter_review_title"
                      )}
                      type="text"
                    />

                    <RBForm.Group className="mb-3">
                      <RBForm.Label>{t("common.fields.message")}</RBForm.Label>
                      <ErrorAsterisk
                        show={!!(errors.review_text && touched.review_text)}
                      />
                      <FloatingLabel label="">
                        <Field
                          as="textarea"
                          className="form-control"
                          name="review_text"
                          placeholder={t(
                            "components.leave_review.enter_review_text"
                          )}
                          style={{ height: "100px" }}
                        />
                      </FloatingLabel>
                      <ErrorMessage
                        className="input-error-message"
                        component="div"
                        name="review_text"
                      />
                    </RBForm.Group>
                    <Button
                      onClick={() => handleSubmitClick(errors)}
                      type="submit"
                      variant="primary"
                    >
                      {t("components.leave_review.submit")}
                    </Button>
                  </RBForm.Group>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </>
  );
}

export default LeaveReview;
