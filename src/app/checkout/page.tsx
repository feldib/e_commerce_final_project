"use client"
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { order } from "@/fetching/fetching";
import React from "react";
import { useRouter } from "next/navigation";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import UserDataChangingComponent from "@/components/input/UserDataComponent";

function CheckoutPage() {
  const router = useRouter();;

  const { user } = React.useContext(UserDataContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email required").email("Invalid email"),
    first_name: Yup.string().required("Email required"),
    last_name: Yup.string().required("Email required"),
    address: Yup.string().required("Email required"),
    phone_number: Yup.string().required("Email required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      address: user.address || "",
      phone_number: user.phone_number || "",
    },

    validationSchema,

    onSubmit: (values) => {
      order(values).then(() => router.push("/receipt"));
    },
  });

  return (
    <>
      <form className="pb-5" onSubmit={formik.handleSubmit}>
        <UserDataChangingComponent
          title={"Invoice Data"}
          formik={formik}
          checkout={true}
          button={
            <Row>
              <Col className="text-center mb-5">
                <Button type="submit">Order</Button>
              </Col>
            </Row>
          }
        />
      </form>
    </>
  );
}

export default CheckoutPage;
