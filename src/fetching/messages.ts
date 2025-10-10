import axiosConfigured from "@/utils/axiosConfigured";
import { ADMIN_URL, SERVER_URL, USERS_URL } from "@/utils/constants";

import { Message } from "./types";

// ===================
// Messages
// ===================

export const sendMessageToAdministrator = async (
  email: string,
  title: string,
  message: string
): Promise<void> => {
  await axiosConfigured.post(
    `${SERVER_URL}/${USERS_URL}/message_to_administrator`,
    {
      email,
      title,
      message,
    }
  );
};

export const replyToMessage = async (
  message_id: number,
  email: string,
  reply_title: string,
  reply_text: string
): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/${ADMIN_URL}/reply_to_message`, {
    message_id,
    email,
    reply_title,
    reply_text,
  });
};

export const getUnansweredMessages = async (): Promise<Message[]> => {
  const res = await axiosConfigured.get(
    `${SERVER_URL}/${ADMIN_URL}/unanswered_messages`
  );
  return res.data as Message[];
};
