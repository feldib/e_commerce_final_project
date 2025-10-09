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

import SubPageTitle from "@/components/layout/SubPageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

import { CheckoutFormData } from "@/fetching/types";

import UserDataInputComponent from "./UserDataInputComponent";

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

  const handleSaveDataChange = () => {
    setChangeUserData(!changeUserData);
  };

  return (
    <Container className="px-3 mb-5">
      <SubPageTitle title={`${title}`} />

      <Row className="mx-auto mb-5 floating-element">
        <Row>
          <Col className="mx-5 mb-5">
            <UserDataInputComponent
              changeUserData={changeUserData}
              error={formik.errors.email}
              icon={faUser}
              label={t("common.fields.email_address")}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("common.placeholders.enter_email")}
              touched={!!formik.touched.email}
              type="email"
              value={formik.values.email}
            />

            <UserDataInputComponent
              changeUserData={changeUserData}
              error={formik.errors.first_name}
              icon={faQuestion}
              label={t("common.fields.first_name")}
              name="first_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("common.placeholders.enter_first_name")}
              touched={!!formik.touched.first_name}
              type="text"
              value={formik.values.first_name}
            />

            <UserDataInputComponent
              changeUserData={changeUserData}
              error={formik.errors.last_name}
              icon={faQuestion}
              label={t("common.fields.last_name")}
              name="last_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("common.placeholders.enter_last_name")}
              touched={!!formik.touched.last_name}
              type="text"
              value={formik.values.last_name}
            />

            <UserDataInputComponent
              changeUserData={changeUserData}
              error={formik.errors.address}
              icon={faHouse}
              label={t("common.fields.address")}
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("components.user_data.enter_address")}
              touched={!!formik.touched.address}
              type="textarea"
              value={formik.values.address}
            />

            <UserDataInputComponent
              changeUserData={changeUserData}
              error={formik.errors.phone_number}
              icon={faPhone}
              label={t("common.fields.phone_number")}
              name="phone_number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder={t("components.user_data.enter_phone_number")}
              touched={!!formik.touched.phone_number}
              type="text"
              value={formik.values.phone_number}
            />

            {checkout && (
              <Form.Check
                label={t("common.actions.save_data")}
                onChange={handleSaveDataChange}
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
