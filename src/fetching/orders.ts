import axiosConfigured from "@/utils/axiosConfigured";
import { ADMIN_URL, SERVER_URL, USERS_URL } from "@/utils/constants";

import { CheckoutFormData, Order } from "./types";

// ===================
// Orders
// ===================

export const order = async (invoice_data: CheckoutFormData): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/${USERS_URL}/make_order`, {
    invoice_data,
  });
  // returns void
};

export const getOrderHistory = async (user_id: number): Promise<Order[]> => {
  const res = await axiosConfigured.get(
    `${SERVER_URL}/${ADMIN_URL}/orders?user_id=${user_id}`
  );
  return res.data as Order[];
};
