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
              label={t("app.user.data.email_address")}
              name="email"
              type="email"
              placeholder={t("common.enter_email")}
              icon={faUser}
              showAsterisk={!!(formik.errors.email && formik.touched.email)}
              error={formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              changeUserData={changeUserData}
            />

            <UserDataInputComponents
              label={t("app.user.data.first_name")}
              name="first_name"
              type="text"
              placeholder={t("app.register.enter_first_name")}
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
              label={t("app.user.data.last_name")}
              name="last_name"
              type="text"
              placeholder={t("app.register.enter_last_name")}
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
              label={t("common.address")}
              name="address"
              type="textarea"
              placeholder={t("components.user_data.enter_address")}
              icon={faHouse}
              showAsterisk={!!formik.errors.address && !!formik.touched.address}
              error={formik.errors.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              changeUserData={changeUserData}
            />

            <UserDataInputComponents
              label={t("app.user.data.phone_number")}
              name="phone_number"
              type="text"
              placeholder={t("components.user_data.enter_phone_number")}
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
