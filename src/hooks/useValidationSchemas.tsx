import * as Yup from "yup";

import { useI18n } from "@/components/providers/I18nProvider";

export const useValidationSchemas = () => {
  const { t } = useI18n();

  const commonValidationRules = {
    email: Yup.string()
      .required(t("validation.email_required"))
      .email(t("validation.email_invalid")),
    password: Yup.string().required(t("validation.password_required")),
    firstName: Yup.string().required(t("validation.first_name_required")),
    lastName: Yup.string().required(t("validation.last_name_required")),
    address: Yup.string().required(t("validation.address_required")),
    phoneNumber: Yup.string().required(t("validation.phone_number_required")),
    title: Yup.string().required(t("validation.title_required")),
    message: Yup.string().required(t("validation.message_required")),
    reviewText: Yup.string().required(t("validation.review_text_required")),
  };

  const createEmailMatchValidation = (fieldName: string = "email") =>
    Yup.string()
      .required(t("validation.repeat_email_required"))
      .oneOf([Yup.ref(fieldName)], t("validation.email_match"));

  const createPasswordMatchValidation = (fieldName: string = "password") =>
    Yup.string()
      .required(t("validation.repeat_password_required"))
      .oneOf([Yup.ref(fieldName)], t("validation.password_match"));

  return {
    commonValidationRules,
    createEmailMatchValidation,
    createPasswordMatchValidation,

    loginSchema: Yup.object().shape({
      email: commonValidationRules.email,
      password: commonValidationRules.password,
    }),

    forgotPasswordSchema: Yup.object().shape({
      email: commonValidationRules.email,
    }),

    resetPasswordSchema: Yup.object().shape({
      password: commonValidationRules.password,
      repeatPassword: createPasswordMatchValidation(),
    }),

    contactUsSchema: Yup.object().shape({
      email: commonValidationRules.email,
      title: commonValidationRules.title,
      message: commonValidationRules.message,
    }),

    reviewSchema: Yup.object().shape({
      title: commonValidationRules.title,
      review_text: commonValidationRules.reviewText,
    }),

    registrationSchema: Yup.object().shape({
      email: commonValidationRules.email,
      repeatEmail: createEmailMatchValidation(),
      password: commonValidationRules.password,
      repeatPassword: createPasswordMatchValidation(),
      firstName: commonValidationRules.firstName,
      lastName: commonValidationRules.lastName,
    }),

    userDataSchema: Yup.object().shape({
      email: commonValidationRules.email,
      first_name: Yup.string().required(t("validation.first_name_required")),
      last_name: Yup.string().required(t("validation.last_name_required")),
      address: Yup.string().optional(),
      phone_number: Yup.string().optional(),
    }),

    checkoutSchema: Yup.object().shape({
      email: commonValidationRules.email,
      first_name: commonValidationRules.firstName,
      last_name: commonValidationRules.lastName,
      address: commonValidationRules.address,
      phone_number: commonValidationRules.phoneNumber,
    }),

    messageReplySchema: Yup.object().shape({
      reply_title: commonValidationRules.title,
      reply_text: commonValidationRules.message,
    }),
  };
};
