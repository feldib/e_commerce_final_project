/**
 * Mock for application constants
 */

export const SERVER_URL = "http://localhost:3001";
export const API_ENDPOINTS = {
  AUTH: "/auth",
  USERS: "/users",
  ARTWORKS: "/artworks",
  ORDERS: "/orders",
  REVIEWS: "/reviews",
  CATEGORIES: "/categories",
  SHOPPING_CART: "/shopping-cart",
  WISHLIST: "/wishlist",
  MESSAGES: "/messages",
  IMAGES: "/images",
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN: "/admin",
  PROFILE: "/user",
  SHOPPING_CART: "/shopping_cart",
  CHECKOUT: "/checkout",
  ABOUT: "/about",
  CONTACT: "/contact",
};

export const TOAST_DURATION = 3000;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
