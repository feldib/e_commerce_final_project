import axiosConfigured from "@/utils/axiosConfigured";
import { ADMIN_URL, SERVER_URL } from "@/utils/constants";

// ===================
// Featured
// ===================

export const addToFeatured = async (artwork_id: number): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/${ADMIN_URL}/featured`, {
    artwork_id,
  });
  // returns void
};

export const removeFromFeatured = async (artwork_id: number): Promise<void> => {
  await axiosConfigured.delete(
    `${SERVER_URL}/${ADMIN_URL}/featured/${artwork_id}`
  );
};

export const isFeatured = async (artwork_id: number): Promise<boolean> => {
  const result = await axiosConfigured.get(
    `${SERVER_URL}/${ADMIN_URL}/featured/${artwork_id}`
  );
  return result.data as boolean;
};
