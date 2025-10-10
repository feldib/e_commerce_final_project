"use client";
import React from "react";

import UserDataChangingComponent from "@/components/input/user_data/UserDataComponent";

import useUserData from "./useUserData";

function UserData() {
  const { t, formik } = useUserData();

  return (
    <UserDataChangingComponent
      formik={formik}
      title={t("app.user.data.title")}
    />
  );
}

export default UserData;
