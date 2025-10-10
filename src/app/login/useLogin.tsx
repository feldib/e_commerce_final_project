"use client";
import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { showLoginErrorToast, showLoginSuccessToast } from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import { logIn } from "@/fetching/fetching";
import { User } from "@/fetching/types";

import { useLoginSchema } from "@/hooks/useValidationSchemas";

type LoginFormValues = {
  email: string;
  password: string;
};

interface UseLoginReturn {
  t: (key: string) => string;
  loginSchema: object;
  initialValues: LoginFormValues;
  onSubmit: (values: LoginFormValues) => Promise<void>;
}

function useLogin(): UseLoginReturn {
  const searchParams = useSearchParams();
  const to_checkout = searchParams.get("to_checkout") === "true";
  const router = useRouter();
  const { t } = useI18n();
  const loginSchema = useLoginSchema();

  const initialValues = {
    email: "",
    password: "",
  };

  const { settleSuccessfulLogIn } = React.useContext(UserDataContext);

  async function onSubmit(values: { email: string; password: string }) {
    try {
      await logIn(values.email, values.password, (userData: User) => {
        settleSuccessfulLogIn(to_checkout, userData, router);
        showLoginSuccessToast(t);
      });
    } catch {
      showLoginErrorToast(t);
    }
  }

  return {
    t,
    loginSchema,
    initialValues,
    onSubmit,
  };
}

export default useLogin;
