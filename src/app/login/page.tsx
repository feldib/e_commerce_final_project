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
import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { logIn } from "@/fetching/fetching";
import { User } from "@/fetching/types";

import { useLoginSchema } from "@/hooks/useValidationSchemas";

function SignInPageInner() {
  const searchParams = useSearchParams();
  const to_checkout = searchParams.get("to_checkout") === "true";
  const router = useRouter();
  const { t } = useI18n();
  const loginSchema = useLoginSchema();

  const initialValues = {
    email: "",
    password: "",
  };

  const { settleSuccessfulLogIn } = React.useContext(UserDataContext);

  async function onSubmit(values: { email: string; password: string }) {
    try {
      await logIn(values.email, values.password, (userData: User) => {
        settleSuccessfulLogIn(to_checkout, userData, router);
        showLoginSuccessToast(t);
      });
    } catch {
      showLoginErrorToast(t);
    }
  }

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
                    label={t("common.email_address")}
                    name="email"
                    placeholder={t("common.enter_email")}
                    type="email"
                  />

                  <InputComponent
                    hasError={!!errors.password && !!touched.password}
                    icon={faKey}
                    label={t("common.password")}
                    name="password"
                    placeholder={t("common.enter_password")}
                    type="password"
                  />

                  <Button type="submit" variant="primary">
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
