"use client";
import React from "react";

import {
  faHouse,
  faPhone,
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FormikProps } from "formik";
import { ToastContainer } from "react-toastify";

import { useI18n } from "@/components/providers/I18nProvider";
import SubPageTitle from "@/components/SubPageTitle";

import { CheckoutFormData } from "@/fetching/types";

import UserDataInputComponents from "./UserDataInputComponent";

type UserDataChangingComponentProps = {
  title: string;
  checkout?: boolean;
  formik: FormikProps<CheckoutFormData>;
  button?: React.ReactNode;
};

function UserDataChangingComponent({
  title,
  checkout = false,
  formik,
  button,
}: UserDataChangingComponentProps) {
  const { t } = useI18n();
  const [changeUserData, setChangeUserData] = React.useState(!checkout);

  return (
    <Container className="px-3 mb-5">
      <SubPageTitle title={`${title}`} />

      <Row className="mx-auto mb-5 floating-element">
        <Row>
          <Col className="mx-5 mb-5">
            <UserDataInputComponents
              changeUserData={changeUserData}
              error={formik.errors.email}
              icon={faUser}
              label={t("app.user.data.email_address")}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("common.enter_email")}
              showAsterisk={!!(formik.errors.email && formik.touched.email)}
              type="email"
              value={formik.values.email}
            />

            <UserDataInputComponents
              changeUserData={changeUserData}
              error={formik.errors.first_name}
              icon={faQuestion}
              label={t("app.user.data.first_name")}
              name="first_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("app.register.enter_first_name")}
              showAsterisk={
                !!formik.errors.first_name && !!formik.touched.first_name
              }
              type="text"
              value={formik.values.first_name}
            />

            <UserDataInputComponents
              changeUserData={changeUserData}
              error={formik.errors.last_name}
              icon={faQuestion}
              label={t("app.user.data.last_name")}
              name="last_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("app.register.enter_last_name")}
              showAsterisk={
                !!formik.errors.last_name && !!formik.touched.last_name
              }
              type="text"
              value={formik.values.last_name}
            />

            <UserDataInputComponents
              changeUserData={changeUserData}
              error={formik.errors.address}
              icon={faHouse}
              label={t("common.address")}
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("components.user_data.enter_address")}
              showAsterisk={!!formik.errors.address && !!formik.touched.address}
              type="textarea"
              value={formik.values.address}
            />

            <UserDataInputComponents
              changeUserData={changeUserData}
              error={formik.errors.phone_number}
              icon={faPhone}
              label={t("app.user.data.phone_number")}
              name="phone_number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("components.user_data.enter_phone_number")}
              showAsterisk={
                !!formik.errors.phone_number && !!formik.touched.phone_number
              }
              type="text"
              value={formik.values.phone_number}
            />

            {checkout && (
              <Form.Check
                label={t("app.checkout.save_data")}
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
