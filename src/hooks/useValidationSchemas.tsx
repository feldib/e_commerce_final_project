import { useMemo } from "react";

import * as Yup from "yup";

import { MAX_IMAGE_SIZE } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider";

import { isValidImage } from "@/helpers/fileValidation";

// Reusable validation functions
const createEmailValidation = (t: (key: string) => string) =>
  Yup.string()
    .required(t("validation.email_required"))
    .email(t("validation.email_invalid"));

const createPasswordValidation = (t: (key: string) => string) =>
  Yup.string().required(t("validation.password_required"));

const createFirstNameValidation = (t: (key: string) => string) =>
  Yup.string().required(t("validation.first_name_required"));

const createLastNameValidation = (t: (key: string) => string) =>
  Yup.string().required(t("validation.last_name_required"));

const createAddressValidation = (t: (key: string) => string) =>
  Yup.string().required(t("validation.address_required"));

const createPhoneNumberValidation = (t: (key: string) => string) =>
  Yup.string().required(t("validation.phone_number_required"));

const createTitleValidation = (t: (key: string) => string) =>
  Yup.string().required(t("validation.title_required"));

const createMessageValidation = (t: (key: string) => string) =>
  Yup.string().required(t("validation.message_required"));

const createReviewTextValidation = (t: (key: string) => string) =>
  Yup.string().required(t("validation.review_text_required"));

const createRepeatEmailValidation = (
  t: (key: string) => string,
  fieldName = "email",
) =>
  Yup.string()
    .required(t("validation.repeat_email_required"))
    .oneOf([Yup.ref(fieldName)], t("validation.email_match"));

const createRepeatPasswordValidation = (
  t: (key: string) => string,
  fieldName = "password",
) =>
  Yup.string()
    .required(t("validation.repeat_password_required"))
    .oneOf([Yup.ref(fieldName)], t("validation.password_match"));

const createDescriptionValidation = (t: (key: string) => string) =>
  Yup.string().required(t("validation.description_required"));

// Using imported isValidImage function from fileValidation

const createThumbnailValidation = (t: (key: string) => string) =>
  Yup.mixed()
    .required(t("validation.thumbnail_required"))
    .test("is-valid-type", t("validation.not_valid_image_type"), (value) =>
      isValidImage(value instanceof File ? value.name : ""),
    )
    .test(
      "is-valid-size",
      t("validation.max_allowed_size"),
      (value) => value instanceof File && value.size <= MAX_IMAGE_SIZE,
    );

const createOtherPicturesValidation = (t: (key: string) => string) =>
  Yup.array().of(
    Yup.mixed()
      .test("is-valid-type", t("validation.not_valid_image_type"), (value) =>
        isValidImage(value instanceof File ? value.name : ""),
      )
      .test(
        "is-valid-size",
        t("validation.max_allowed_size"),
        (value) => value instanceof File && value.size <= MAX_IMAGE_SIZE,
      ),
  );

const createTagsValidation = (t: (key: string) => string) =>
  Yup.array()
    .min(3, t("validation.add_minimum_tags"))
    .of(
      Yup.object().shape({
        id: Yup.string(),
        text: Yup.string(),
      }),
    );

// Individual schema hooks for better performance - only create what you need
export const useLoginSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      email: createEmailValidation(t),
      password: createPasswordValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useContactSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      email: createEmailValidation(t),
      title: createTitleValidation(t),
      message: createMessageValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useForgotPasswordSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      email: createEmailValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useResetPasswordSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      password: createPasswordValidation(t),
      repeatPassword: createRepeatPasswordValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useReviewSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      title: createTitleValidation(t),
      review_text: createReviewTextValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useUserDataSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      email: createEmailValidation(t),
      first_name: createFirstNameValidation(t),
      last_name: createLastNameValidation(t),
      address: Yup.string().optional(),
      phone_number: Yup.string().optional(),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useCheckoutSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      email: createEmailValidation(t),
      first_name: createFirstNameValidation(t),
      last_name: createLastNameValidation(t),
      address: createAddressValidation(t),
      phone_number: createPhoneNumberValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useMessageReplySchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      reply_title: createTitleValidation(t),
      reply_text: createMessageValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useRegistrationSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      email: createEmailValidation(t),
      repeatEmail: createRepeatEmailValidation(t),
      password: createPasswordValidation(t),
      repeatPassword: createRepeatPasswordValidation(t),
      firstName: createFirstNameValidation(t),
      lastName: createLastNameValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useNewArtworkSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      title: createTitleValidation(t),
      artist_name: Yup.string().required(t("validation.name_required")),
      price: Yup.number()
        .required(t("validation.price_required"))
        .min(1, t("validation.price_min")),
      quantity: Yup.number()
        .required(t("validation.quantity_required"))
        .min(1, t("validation.quantity_min")),
      category_id: Yup.number().required(t("validation.category_required")),
      thumbnail: createThumbnailValidation(t),
      tags: createTagsValidation(t),
      other_pictures: createOtherPicturesValidation(t),
      description: createDescriptionValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};

export const useEditArtworkSchema = () => {
  const { t, locale } = useI18n();

  return useMemo(() => {
    return Yup.object().shape({
      title: createTitleValidation(t),
      artist_name: Yup.string().required(t("validation.name_required")),
      price: Yup.number()
        .required(t("validation.price_required"))
        .min(1, t("validation.price_min")),
      quantity: Yup.number()
        .required(t("validation.quantity_required"))
        .min(1, t("validation.quantity_min")),
      category_id: Yup.number().required(t("validation.category_required")),
      thumbnail: Yup.mixed().required(t("validation.thumbnail_required")),
      tags: createTagsValidation(t),
      other_pictures: Yup.array(),
      description: createDescriptionValidation(t),
    });
  }, [t, locale]); // eslint-disable-line react-hooks/exhaustive-deps -- locale needed for language changes
};
