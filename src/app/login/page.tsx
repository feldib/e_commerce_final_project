"use client";
import React, { Suspense } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import { showLoginErrorToast, showLoginSuccessToast } from "@/utils/toastUtils";
import { loginSchema } from "@/utils/validationSchemas";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/PageTitle";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { logIn } from "@/fetching/fetching";
import { User } from "@/fetching/types";

function SignInPageInner() {
  const searchParams = useSearchParams();
  const to_checkout = searchParams.get("to_checkout") === "true";
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const { settleSuccessfulLogIn } = React.useContext(UserDataContext);

  async function onSubmit(values: { email: string; password: string }) {
    try {
      await logIn(values.email, values.password, (userData: { user: User }) => {
        settleSuccessfulLogIn(to_checkout, userData, router);
      });
      showLoginSuccessToast();
    } catch {
      showLoginErrorToast();
    }
  }

  const signInSchema = loginSchema;

  return (
    <Container className="px-3 pb-5">
      <PageTitle title="Log In" />

      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Row className="mx-auto floating-element">
            <Row>
              <Col className="mx-3 pb-5">
                <Form>
                  <InputComponent
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    icon={faUser}
                    showAsterisk={!!errors.email && !!touched.email}
                  />

                  <InputComponent
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    icon={faKey}
                    showAsterisk={!!errors.password && !!touched.password}
                  />

                  <Button variant="primary" type="submit">
                    Sign In
                  </Button>
                  <ToastContainer position="bottom-right" />
                </Form>
              </Col>
            </Row>

            <Row className="mx-5 pt-3">
              <Col>
                <Link href="/forgot_password">Forgot password</Link>
              </Col>
            </Row>
          </Row>
        )}
      </Formik>
    </Container>
  );
}

function SignInPage() {
  return (
    <Suspense>
      <SignInPageInner />
    </Suspense>
  );
}

export default SignInPage;
