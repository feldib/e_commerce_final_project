"use client";
import React, { Suspense } from "react";
import { changePassword } from "@/fetching/fetching";
import { Container, Row, Col, Button } from "react-bootstrap";
import InputComponent from "../../components/input/InputComponent";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";

function ResetPasswordInner() {
  const initialValues = {
    password: "",
    repeatPassword: "",
  };

  const searchParams = useSearchParams();

  const router = useRouter();

  const onSubmit = (values: any) => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    changePassword(token, email, values.password)
      .then(() => {
        toast.success("Password changed successfully", {
          className: "toast-success",
        });
        router.push("/login");
      })
      .catch(() => {
        toast.error("Error: couldn't change password", {
          className: "toast-error",
        });
      });
  };

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string().required("Password required"),
    repeatPassword: Yup.string()
      .required("Repeat password required")
      .oneOf([Yup.ref("password")], "Must match password"),
  });

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
                    Object.keys(errors).length &&
                      toast.error("Incorrect data", {
                        className: "toast-error",
                      });
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
