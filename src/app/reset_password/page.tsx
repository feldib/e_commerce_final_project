"use client";
import React, { Suspense } from "react";

import { useRouter,useSearchParams } from "next/navigation";

import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Button,Col, Container, Row } from "react-bootstrap";
import { Form,Formik } from "formik";
import { ToastContainer } from "react-toastify";

import {
  showIncorrectDataToast,
  showPasswordChangeErrorToast,
  showPasswordResetSuccessToast,
} from "@/utils/toastUtils";
import { resetPasswordSchema } from "@/utils/validationSchemas";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/PageTitle";

import { changePassword } from "@/fetching/fetching";

type ResetPasswordFormValues = {
  password: string;
  repeatPassword: string;
};

function ResetPasswordInner() {
  const initialValues: ResetPasswordFormValues = {
    password: "",
    repeatPassword: "",
  };

  const searchParams = useSearchParams();

  const router = useRouter();

  const onSubmit = (values: ResetPasswordFormValues) => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    changePassword(token, email, values.password)
      .then(() => {
        showPasswordResetSuccessToast();
        router.push("/login");
      })
      .catch(() => {
        showPasswordChangeErrorToast();
      });
  };

  return (
    <Container className="pb-5">
      <PageTitle title="Reset Password" />
      <Row className="floating-element">
        <Col className="mx-5 pb-5">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={resetPasswordSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <InputComponent
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  icon={faKey}
                  showAsterisk={!!errors.password && !!touched.password}
                />

                <InputComponent
                  label="Password"
                  name="repeatPassword"
                  type="password"
                  placeholder="Enter repeat password"
                  icon={faKey}
                  showAsterisk={
                    !!errors.repeatPassword && !!touched.repeatPassword
                  }
                />

                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    if (Object.keys(errors).length) {
                      showIncorrectDataToast();
                    }
                  }}
                >
                  Change password
                </Button>
                <ToastContainer position="bottom-right" />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordInner />
    </Suspense>
  );
}
