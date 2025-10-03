"use client";
import React from "react";

import { useFormik } from "formik";

import UserDataChangingComponent from "@/components/input/UserDataComponent";
import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { useUserDataSchema } from "@/hooks/useValidationSchemas";

function UserData() {
  const { user } = React.useContext(UserDataContext);
  const { t } = useI18n();
  const userDataSchema = useUserDataSchema();

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

  return (
    <UserDataChangingComponent
      title={t("app.user.data.title")}
      formik={formik}
    />
  );
}

export default UserData;
