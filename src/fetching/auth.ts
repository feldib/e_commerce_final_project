import axiosConfigured from "@/utils/axiosConfigured";
import { ADMIN_URL, SERVER_URL, USERS_URL } from "@/utils/constants";

import { User } from "./types";

// ===================
// User-related
// ===================

export const serverLogOut = async (): Promise<void> => {
  await axiosConfigured.get(`${SERVER_URL}/log_out`).catch(console.log);
};

export const sendForgotPasswordEmail = async (email: string): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/forgot_password`, { email });
};

export const registerNewUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ data: { user: User } }> => {
  return await axiosConfigured.post(`${SERVER_URL}/${USERS_URL}/new_user`, {
    last_name: lastName,
    first_name: firstName,
    email,
    password,
  });
};

export const logIn = async (
  email: string,
  password: string,
  settleSuccess: (userData: User) => void
): Promise<void> => {
  await axiosConfigured
    .post(`${SERVER_URL}/login`, { email, password })
    .then(function (response) {
      const userData = response.data as User;
      settleSuccess(userData);
    });
};

export const changePassword = async (
  token: string | null,
  email: string | null,
  newPassword: string
): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/reset_password`, {
    token,
    email,
    new_password: newPassword,
  });
};

export const getLoggedIn = async (): Promise<{ data: { user: User } }> => {
  return axiosConfigured.get(`${SERVER_URL}/logged_in`);
};

export const getIsAdmin = async (): Promise<{
  data: { is_admin: boolean };
}> => {
  return axiosConfigured.get(`${SERVER_URL}/${ADMIN_URL}/is_admin`);
};

export const updateUserData = async (
  field_name: string,
  value: string
): Promise<{ data: User }> => {
  return axiosConfigured.post(`${SERVER_URL}/${USERS_URL}/update_data`, {
    field_name,
    value,
  });
};
