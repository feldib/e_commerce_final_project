"use client";
import React, { Suspense } from "react";

import Link from "next/link";

import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/layout/PageTitle";

import useLogin from "./useLogin";

function SignInPageInner() {
  const { t, loginSchema, initialValues, onSubmit } = useLogin();

  return (
    <Container className="px-3 pb-5">
      <PageTitle title={t("app.login.title")} />

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {({ errors, touched }) => (
          <Row className="mx-auto floating-element">
            <Row>
              <Col className="mx-3 pb-5">
                <Form>
                  <InputComponent
                    hasError={!!errors.email && !!touched.email}
                    icon={faUser}
                    label={t("common.fields.email_address")}
                    name="email"
                    placeholder={t("common.placeholders.enter_email")}
                    type="email"
                  />

                  <InputComponent
                    hasError={!!errors.password && !!touched.password}
                    icon={faKey}
                    label={t("common.fields.password")}
                    name="password"
                    placeholder={t("common.placeholders.enter_password")}
                    type="password"
                  />

                  <Button type="submit" variant="primary">
                    {t("common.actions.sign_in")}
                  </Button>
                  <ToastContainer position="bottom-right" />
                </Form>
              </Col>
            </Row>

            <Row className="mx-5 pt-3">
              <Col>
                <Link href="/forgot_password">
                  {t("app.login.forgot_password")}
                </Link>
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
