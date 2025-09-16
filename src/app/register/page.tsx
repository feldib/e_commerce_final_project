"use client";
import React, { Suspense } from "react";
import { registerNewUser } from "@/fetching/fetching";
import { logIn } from "@/fetching/fetching";
import InputComponent from "@/components/input/InputComponent";
import { Container, Col, Row, Button } from "react-bootstrap";
import { faUser, faKey, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";
import { useSearchParams } from "next/navigation";
import { User } from "@/fetching/types";

type RegistrationPageProps = {
  settleSuccessfulRegistration: (
    to_checkout: boolean,
    userData: { user: User }
  ) => void;
};

function RegistrationPageInner({
  settleSuccessfulRegistration,
}: RegistrationPageProps) {
  const searchParams = useSearchParams();
  const to_checkout = searchParams.get("to_checkout");

  const attemptRegistration = async (
    values: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    settleSuccessfulRegistration: (
      to_checkout: boolean,
      userData: { user: User }
    ) => void
  ) => {
    await registerNewUser(
      values.email,
      values.password,
      values.firstName,
      values.lastName
    )
      .then(function () {
        logIn(values.email, values.password, (userData) => {
          settleSuccessfulRegistration(to_checkout, userData);
        });
      })
      .catch(() => {
        console.log("Registration failed");
      });
  };

  const initialValues = {
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  };

  async function onSubmit(values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
  }) {
    try {
      await attemptRegistration(values, settleSuccessfulRegistration);
      toast.success("Registration successful", {
        className: "toast-success",
      });
    } catch {
      toast.error("A user is registered with email already", {
        className: "toast-error",
      });
    }
  }

  const registrationSchema = Yup.object().shape({
    email: Yup.string().required("Email required").email("Invalid email"),
    repeatEmail: Yup.string()
      .required("Repeat email required")
      .oneOf([Yup.ref("email")], "Must match email"),
    password: Yup.string().required("Password required"),
    repeatPassword: Yup.string()
      .required("Repeat password required")
      .oneOf([Yup.ref("password")], "Must match password"),
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
  });

  return (
    <Container className="pb-5 px-3">
      <PageTitle title="Register" />
      <Row className="mx-auto mb-5 pb-5 floating-element">
        <Col className="mx-5 pb-5 ">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={registrationSchema}
          >
            {({ errors, touched }) => (
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
                  label="Email address again"
                  name="repeatEmail"
                  type="email"
                  placeholder="Enter email again"
                  icon={faUser}
                  showAsterisk={!!errors.repeatEmail && !!touched.repeatEmail}
                />

                <InputComponent
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  icon={faKey}
                  showAsterisk={!!errors.password && !!touched.password}
                />

                <InputComponent
                  label="Password again"
                  name="repeatPassword"
                  type="password"
                  placeholder="Enter password again"
                  icon={faKey}
                  showAsterisk={
                    !!errors.repeatPassword && !!touched.repeatPassword
                  }
                />

                <InputComponent
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  icon={faQuestion}
                  showAsterisk={!!errors.firstName && !!touched.firstName}
                />

                <InputComponent
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  icon={faQuestion}
                  showAsterisk={!!errors.lastName && !!touched.lastName}
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
                  Register
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

export default function RegistrationPage(props: RegistrationPageProps) {
  return (
    <Suspense>
      <RegistrationPageInner {...props} />
    </Suspense>
  );
}
