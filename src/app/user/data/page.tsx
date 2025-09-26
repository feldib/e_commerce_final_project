"use client";
import React from "react";

import { useFormik } from "formik";

import { userDataSchema } from "@/utils/validationSchemas";

import UserDataChangingComponent from "@/components/input/UserDataComponent";
import { UserDataContext } from "@/components/providers/UserDataProvider";

function UserData() {
  const { user } = React.useContext(UserDataContext);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address || "",
      phone_number: user.phone_number || "",
    },

    validationSchema: userDataSchema,

    onSubmit: async () => {
      return;
    },
  });

  return <UserDataChangingComponent title={"User Data"} formik={formik} />;
}

export default UserData;
