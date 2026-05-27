"use client";

import React from "react";

import { messageToast } from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import { sendMessageToAdministrator } from "@/fetching/messages";
import { User } from "@/fetching/types";

import { createHandleSubmitClick } from "@/helpers/formValidationHelpers";
import { useContactSchema } from "@/hooks/useValidationSchemas";

type ContactFormValues = {
  email: string;
  title: string;
  message: string;
};

type UseContactFormReturn = {
  t: (key: string) => string;
  loggedIn: boolean;
  user: User;
  contactUsSchema: object;
  form: React.RefObject<HTMLFormElement | null>;
  initialValues: ContactFormValues;
  onSubmit: (values: ContactFormValues) => Promise<void>;
  handleSubmitClick: (errors: Record<string, unknown>) => void;
};

function useContactForm(): UseContactFormReturn {
  const { loggedIn, user } = React.useContext(UserDataContext);
  const { t } = useI18n();
  const contactUsSchema = useContactSchema();
  const form = React.useRef<HTMLFormElement | null>(null);

  const initialValues = {
    email: loggedIn ? user.email : "",
    title: "",
    message: "",
  };

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await sendMessageToAdministrator(
        values.email,
        values.title,
        values.message
      );
      messageToast.messageSuccess(t);
      form?.current?.reset();
    } catch {
      messageToast.messageSendError(t);
    }
  };

  const handleSubmitClick = createHandleSubmitClick(t);

  return {
    t,
    loggedIn,
    user,
    contactUsSchema,
    form,
    initialValues,
    onSubmit,
    handleSubmitClick,
  };
}

export default useContactForm;
