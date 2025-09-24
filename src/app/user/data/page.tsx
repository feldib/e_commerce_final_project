"use client";
import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import UserDataChangingComponent from "@/components/input/UserDataComponent";
import { UserDataContext } from "@/components/providers/UserDataProvider";

function UserData() {
  const { user } = React.useContext(UserDataContext);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
    first_name: Yup.string().required("Email required"),
    last_name: Yup.string().required("Email required"),
    address: Yup.string(),
    phone_number: Yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address || "",
      phone_number: user.phone_number || "",
    },

    validationSchema,

    onSubmit: async () => {
      return;
    },
  });

  return <UserDataChangingComponent title={"User Data"} formik={formik} />;
}

export default UserData;
