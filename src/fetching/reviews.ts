import axiosConfigured from "@/utils/axiosConfigured";
import { ADMIN_URL, SERVER_URL, USERS_URL } from "@/utils/constants";

// ===================
// Reviews
// ===================

export const leaveReview = async (
  artwork_id: number,
  title: string,
  review_text: string
): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/${USERS_URL}/review`, {
    artwork_id,
    title,
    review_text,
  });
};

export const approveReview = async (review_id: number): Promise<void> => {
  await axiosConfigured.put(`${SERVER_URL}/${ADMIN_URL}/reviews/${review_id}`);
  // returns void
};

export const disapproveReview = async (review_id: number): Promise<void> => {
  await axiosConfigured.delete(
    `${SERVER_URL}/${ADMIN_URL}/reviews/${review_id}`
  );
  // returns void
};
