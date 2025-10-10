"use client";
import React from "react";

import {
  showEmailSubmittedSuccessToast,
  showFormSubmissionErrorToast,
} from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { sendForgotPasswordEmail } from "@/fetching/fetching";

import { useForgotPasswordSchema } from "@/hooks/useValidationSchemas";

type ForgotPasswordFormValues = {
  email: string;
};

interface UseForgotPasswordReturn {
  t: (key: string) => string;
  displayMessage: boolean;
  forgotPasswordSchema: object;
  initialValues: ForgotPasswordFormValues;
  onSubmit: (values: ForgotPasswordFormValues) => void;
}

function useForgotPassword(): UseForgotPasswordReturn {
  const [displayMessage, setDisplayMessage] = React.useState(false);
  const { t } = useI18n();
  const forgotPasswordSchema = useForgotPasswordSchema();

  const initialValues: ForgotPasswordFormValues = {
    email: "",
  };

  const onSubmit = (values: ForgotPasswordFormValues) => {
    sendForgotPasswordEmail(values.email)
      .then(() => {
        setDisplayMessage(true);
        showEmailSubmittedSuccessToast(t);
      })
      .catch(() => {
        showFormSubmissionErrorToast(t);
      });
  };

  return {
    t,
    displayMessage,
    forgotPasswordSchema,
    initialValues,
    onSubmit,
  };
}

export default useForgotPassword;
