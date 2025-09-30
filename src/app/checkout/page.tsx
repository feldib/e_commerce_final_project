"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { Button, Col, Row } from "react-bootstrap";
import { useFormik } from "formik";

import UserDataChangingComponent from "@/components/input/UserDataComponent";
import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { order } from "@/fetching/fetching";
import { CheckoutFormData } from "@/fetching/types";

import { useCheckoutSchema } from "@/hooks/useValidationSchemas";

function CheckoutPage() {
  const router = useRouter();
  const { t } = useI18n();
  const checkoutSchema = useCheckoutSchema();

  const { user } = React.useContext(UserDataContext);

  const formik = useFormik<CheckoutFormData>({
    enableReinitialize: true,
    initialValues: {
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      address: user.address || "",
      phone_number: user.phone_number || "",
    },

    validationSchema: checkoutSchema,

    onSubmit: (values) => {
      order(values).then(() => router.push("/receipt"));
    },
  });

  return (
    <>
      <form className="pb-5" onSubmit={formik.handleSubmit}>
        <UserDataChangingComponent
          title={t("app.checkout.invoice_data")}
          formik={formik}
          checkout={true}
          button={
            <Row>
              <Col className="text-center mb-5">
                <Button type="submit">{t("common.order")}</Button>
              </Col>
            </Row>
          }
        />
      </form>
    </>
  );
}

export default CheckoutPage;
