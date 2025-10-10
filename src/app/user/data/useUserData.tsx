"use client";
import React from "react";

import { useFormik } from "formik";

import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { useUserDataSchema } from "@/hooks/useValidationSchemas";

type UserDataFormValues = {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
};

interface UseUserDataReturn {
  t: (key: string) => string;
  formik: ReturnType<typeof useFormik<UserDataFormValues>>;
}

function useUserData(): UseUserDataReturn {
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

  return {
    t,
    formik,
  };
}

export default useUserData;
