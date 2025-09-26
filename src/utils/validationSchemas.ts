import * as Yup from "yup";

export const commonValidationRules = {
  email: Yup.string().required("Email required").email("Invalid email"),

  password: Yup.string().required("Password required"),

  firstName: Yup.string().required("First name required"),

  lastName: Yup.string().required("Last name required"),

  address: Yup.string().required("Address required"),

  phoneNumber: Yup.string().required("Phone number required"),

  title: Yup.string().required("Title required"),

  message: Yup.string().required("Message required"),

  reviewText: Yup.string().required("Review text required"),
};

export const createEmailMatchValidation = (fieldName: string = "email") =>
  Yup.string()
    .required("Repeat email required")
    .oneOf([Yup.ref(fieldName)], "Must match email");

export const createPasswordMatchValidation = (fieldName: string = "password") =>
  Yup.string()
    .required("Repeat password required")
    .oneOf([Yup.ref(fieldName)], "Must match password");

export const loginSchema = Yup.object().shape({
  email: commonValidationRules.email,
  password: commonValidationRules.password,
});

export const forgotPasswordSchema = Yup.object().shape({
  email: commonValidationRules.email,
});

export const resetPasswordSchema = Yup.object().shape({
  password: commonValidationRules.password,
  repeatPassword: createPasswordMatchValidation(),
});

export const contactUsSchema = Yup.object().shape({
  email: commonValidationRules.email,
  title: commonValidationRules.title,
  message: commonValidationRules.message,
});

export const reviewSchema = Yup.object().shape({
  title: commonValidationRules.title,
  review_text: commonValidationRules.reviewText,
});

export const registrationSchema = Yup.object().shape({
  email: commonValidationRules.email,
  repeatEmail: createEmailMatchValidation(),
  password: commonValidationRules.password,
  repeatPassword: createPasswordMatchValidation(),
  firstName: commonValidationRules.firstName,
  lastName: commonValidationRules.lastName,
});

export const userDataSchema = Yup.object().shape({
  email: commonValidationRules.email,
  first_name: Yup.string().required("First name required"),
  last_name: Yup.string().required("Last name required"),
  address: Yup.string().optional(),
  phone_number: Yup.string().optional(),
});

export const checkoutSchema = Yup.object().shape({
  email: commonValidationRules.email,
  first_name: commonValidationRules.firstName,
  last_name: commonValidationRules.lastName,
  address: commonValidationRules.address,
  phone_number: commonValidationRules.phoneNumber,
});

export const messageReplySchema = Yup.object().shape({
  reply_title: commonValidationRules.title,
  reply_text: commonValidationRules.message,
});
