"use client";
import React from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import {
  faUser,
  faQuestion,
  faHouse,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import UserDataInputComponents from "./UserDataInputComponent";
import SubPageTitle from "../SubPageTitle";
import { FormikProps } from "formik";

type UserDataChangingComponentProps = {
  title: string;
  checkout?: boolean;
  formik: FormikProps<Record<string, string>>;
  button?: React.ReactNode;
};

function UserDataChangingComponent({
  title,
  checkout = false,
  formik,
  button,
}: UserDataChangingComponentProps) {
  const [changeUserData, setChangeUserData] = React.useState(!checkout);

  return (
    <Container className="px-3 mb-5">
      <SubPageTitle title={`${title}`} />

      <Row className="mx-auto mb-5 floating-element">
        <Row>
          <Col className="mx-5 mb-5">
            <UserDataInputComponents
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter email"
              icon={faUser}
              showAsterisk={!!(formik.errors.email && formik.touched.email)}
              error={formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              changeUserData={changeUserData}
            />

            <UserDataInputComponents
              label="First Name"
              name="first_name"
              type="text"
              placeholder="Enter First Name"
              icon={faQuestion}
              showAsterisk={
                !!formik.errors.first_name && !!formik.touched.first_name
              }
              error={formik.errors.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              changeUserData={changeUserData}
            />

            <UserDataInputComponents
              label="Last Name"
              name="last_name"
              type="text"
              placeholder="Enter Last Name"
              icon={faQuestion}
              showAsterisk={
                !!formik.errors.last_name && !!formik.touched.last_name
              }
              error={formik.errors.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              changeUserData={changeUserData}
            />

            <UserDataInputComponents
              label="Address"
              name="address"
              type="textarea"
              placeholder="Enter Address"
              icon={faHouse}
              showAsterisk={!!formik.errors.address && !!formik.touched.address}
              error={formik.errors.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              changeUserData={changeUserData}
            />

            <UserDataInputComponents
              label="Phone Number"
              name="phone_number"
              type="text"
              placeholder="Enter Phone Number"
              icon={faPhone}
              showAsterisk={
                !!formik.errors.phone_number && !!formik.touched.phone_number
              }
              error={formik.errors.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              changeUserData={changeUserData}
            />

            {checkout && (
              <Form.Check
                label="Save data"
                onChange={() => {
                  setChangeUserData(!changeUserData);
                }}
              />
            )}

            <ToastContainer position="bottom-right" />
          </Col>
        </Row>
        {button}
      </Row>
    </Container>
  );
}

export default UserDataChangingComponent;
