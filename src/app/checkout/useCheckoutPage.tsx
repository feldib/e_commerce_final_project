"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { useFormik } from "formik";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import { order } from "@/fetching/orders";
import { CheckoutFormData } from "@/fetching/types";

import { useCheckoutSchema } from "@/hooks/useValidationSchemas";

type UseCheckoutPageReturn = {
  t: (key: string) => string;
  formik: ReturnType<typeof useFormik<CheckoutFormData>>;
};

function useCheckoutPage(): UseCheckoutPageReturn {
  const router = useRouter();
  const { t } = useI18n();
  const checkoutSchema = useCheckoutSchema();
  const { user } = React.useContext(UserDataContext);

  const handleSubmit = (values: CheckoutFormData) => {
    order(values).then(() => router.push("/receipt"));
  };

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
    onSubmit: handleSubmit,
  });

  return {
    t,
    formik,
  };
}

export default useCheckoutPage;
