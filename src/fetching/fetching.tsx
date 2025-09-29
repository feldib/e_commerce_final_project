import axiosConfigured from "@/utils/axiosConfigured";
import { ADMIN_URL, SERVER_URL, USERS_URL } from "@/utils/constants";
import { searchArtworksGraphQL } from "@/utils/graphqlSearch";

import {
  Artwork,
  CheckoutFormData,
  Message,
  Order,
  SearchParams,
  ShoppingCartItem,
  User,
} from "./types";

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

// ===================
// Artwork-related
// ===================

export const getArtworkSearchResults = async (
  objects: SearchParams,
  pageNumber: number
): Promise<Artwork[]> => {
  try {
    return await searchArtworksGraphQL(objects, pageNumber);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDataOfArtworks = async (
  shoppingCart: ShoppingCartItem[]
): Promise<Artwork[]> => {
  const results = await Promise.all(
    shoppingCart.map(async (item: ShoppingCartItem) => {
      const results = await axiosConfigured.get(
        `${SERVER_URL}/find_artwork_by_id?artwork_id=${item.artwork_id}`
      );
      const data = results.data as Artwork & { quantity?: number };
      const resObj = {
        ...data,
        quantity: item.quantity,
      };
      return resObj as Artwork;
    })
  );
  return results;
};

export const addNewArtwork = async (artworkData: {
  title: string;
  artist_name: string;
  price: number;
  quantity: number;
  description: string;
  category_id: number;
  tags: string[];
  thumbnail: Blob;
  other_pictures?: Blob[];
}): Promise<{ data: number }> => {
  const formData = new FormData();

  // Add text fields
  formData.append("title", artworkData.title);
  formData.append("artist_name", artworkData.artist_name);
  formData.append("price", artworkData.price.toString());
  formData.append("quantity", artworkData.quantity.toString());
  formData.append("description", artworkData.description);
  formData.append("category_id", artworkData.category_id.toString());
  formData.append("tags", JSON.stringify(artworkData.tags));

  formData.append("thumbnail", artworkData.thumbnail);

  artworkData.other_pictures?.forEach((picture) => {
    formData.append("other_pictures", picture);
  });

  return await axiosConfigured.post(
    `${SERVER_URL}/${ADMIN_URL}/artwork`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updateArtworkData = async (
  artwork_id: number,
  field_name: string,
  value: string | number | boolean | { tname: string }[]
): Promise<{ data: Artwork }> => {
  return axiosConfigured.put(`${SERVER_URL}/${ADMIN_URL}/artwork`, {
    artwork_id,
    field_name,
    value,
  });
};

export const removeArtwork = async (artwork_id: number): Promise<void> => {
  await axiosConfigured.delete(
    `${SERVER_URL}/${ADMIN_URL}/artworks/${artwork_id}`
  );
};

// ===================
// Shopping Cart / Wishlist
// ===================

export const getShoppingCart = async (): Promise<Artwork[]> => {
  const res = await axiosConfigured.get(
    `${SERVER_URL}/${USERS_URL}/shopping_cart`
  );
  return res.data as Artwork[];
};

export const addToShoppingList = async (artwork_id: number): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/${USERS_URL}/shopping_cart`, {
    artwork_id,
  });
  // returns void
};

export const removeFromShoppingList = async (
  artwork_id: number
): Promise<void> => {
  await axiosConfigured.delete(
    `${SERVER_URL}/${USERS_URL}/shopping_cart/${artwork_id}`
  );
  // returns void
};

export const increaseShoppingListItemQuantity = async (
  artwork_id: number
): Promise<void> => {
  await axiosConfigured.put(`${SERVER_URL}/${USERS_URL}/shopping_cart`, {
    action: "increase",
    artwork_id,
  });
  // returns void
};

export const decreaseShoppingListItemQuantity = async (
  artwork_id: number
): Promise<void> => {
  await axiosConfigured.put(`${SERVER_URL}/${USERS_URL}/shopping_cart`, {
    action: "decrease",
    artwork_id,
  });
  // returns void
};

export const replaceSavedShoppingCart = async (
  shopping_cart: { artwork_id: number; quantity: number }[]
): Promise<void> => {
  await axiosConfigured.put(`${SERVER_URL}/${USERS_URL}/shopping_cart`, {
    action: "replace",
    shopping_cart,
  });
  // returns void
};

export const addToWishlisted = async (artwork_id: number): Promise<void> => {
  await axiosConfigured.post(`${SERVER_URL}/${USERS_URL}/wishlist`, {
    artwork_id,
  });
  // returns void
};

export const removeFromWishlisted = async (
  artwork_id: number
): Promise<void> => {
  await axiosConfigured.delete(
    `${SERVER_URL}/${USERS_URL}/wishlist/${artwork_id}`
  );
  // returns void
};

export const isWishlisted = async (artwork_id: number): Promise<boolean> => {
  const result = await axiosConfigured.get(
    `${SERVER_URL}/${USERS_URL}/wishlist/${artwork_id}`
  );
  return result.data as boolean;
};

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

// ===================
// Files/Images
// ===================

export const addNewOtherPictures = (
  artwork_id: number,
  other_pictures: Blob[]
): Promise<void[]> => {
  return Promise.all(
    other_pictures.map((picture) => addNewOtherPicture(artwork_id, picture))
  );
};

export const addNewOtherPicture = async (
  artwork_id: number,
  picture: Blob
): Promise<void> => {
  const formData = new FormData();
  formData.append("picture", picture);
  await axiosConfigured.post(
    `${SERVER_URL}/${ADMIN_URL}/artworks/${artwork_id}/images?type=picture`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const removePicture = async (
  artwork_id: number,
  file_name: string
): Promise<void> => {
  await axiosConfigured.delete(
    `${SERVER_URL}/${ADMIN_URL}/artworks/${artwork_id}/images/${file_name}`
  );
};

export const replaceThumbnail = async (
  artwork_id: number,
  thumbnail: Blob
): Promise<void> => {
  const formData = new FormData();
  formData.append("thumbnail", thumbnail);
  await axiosConfigured.put(
    `${SERVER_URL}/${ADMIN_URL}/artworks/${artwork_id}/images`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
