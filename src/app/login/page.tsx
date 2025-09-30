"use client";
import React, { Suspense } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";

import { showLoginErrorToast, showLoginSuccessToast } from "@/utils/toastUtils";

import InputComponent from "@/components/input/InputComponent";
import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { logIn } from "@/fetching/fetching";
import { User } from "@/fetching/types";

import { useValidationSchemas } from "@/hooks/useValidationSchemas";

function SignInPageInner() {
  const searchParams = useSearchParams();
  const to_checkout = searchParams.get("to_checkout") === "true";
  const router = useRouter();
  const { t } = useI18n();
  const { loginSchema } = useValidationSchemas();

  const initialValues = {
    email: "",
    password: "",
  };

  const { settleSuccessfulLogIn } = React.useContext(UserDataContext);

  async function onSubmit(values: { email: string; password: string }) {
    try {
      await logIn(values.email, values.password, (userData: User) => {
        settleSuccessfulLogIn(to_checkout, userData, router);
      });
      showLoginSuccessToast();
    } catch {
      showLoginErrorToast();
    }
  }

  return (
    <Container className="px-3 pb-5">
      <PageTitle title={t("app.login.title")} />

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Row className="mx-auto floating-element">
            <Row>
              <Col className="mx-3 pb-5">
                <Form>
                  <InputComponent
                    label={t("app.login.email_address")}
                    name="email"
                    type="email"
                    placeholder={t("app.login.enter_email")}
                    icon={faUser}
                    showAsterisk={!!errors.email && !!touched.email}
                  />

                  <InputComponent
                    label={t("app.login.password")}
                    name="password"
                    type="password"
                    placeholder={t("app.login.enter_password")}
                    icon={faKey}
                    showAsterisk={!!errors.password && !!touched.password}
                  />

                  <Button variant="primary" type="submit">
                    {t("common.sign_in")}
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
