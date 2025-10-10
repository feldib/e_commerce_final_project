"use client";
import React from "react";

import { Button, Col, Row } from "react-bootstrap";

import UserDataChangingComponent from "@/components/input/user_data/UserDataComponent/UserDataComponent";

import useCheckoutPage from "./useCheckoutPage";

function CheckoutPage() {
  const { t, formik } = useCheckoutPage();

  return (
    <>
      <form className="pb-5" onSubmit={formik.handleSubmit}>
        <UserDataChangingComponent
          button={
            <Row>
              <Col className="text-center mb-5">
                <Button type="submit">{t("common.shop.order")}</Button>
              </Col>
            </Row>
          }
          checkout={true}
          formik={formik}
          title={t("app.checkout.invoice_data")}
        />
      </form>
    </>
  );
}

export default CheckoutPage;
