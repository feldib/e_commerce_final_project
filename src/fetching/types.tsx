export interface User {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  address?: string;
  phone_number?: string;
  is_admin?: boolean;
}

export interface Artwork {
  id: number;
  title: string;
  artist_name: string;
  price: number;
  quantity: number;
  category_id: number;
  date_added: string;
  description?: string;
  thumbnail?: string;
  cname?: string;
  tags?: Tag[];
  other_pictures?: string[];
  stored_amount: number;
}

export interface Tag {
  id: number;
  tname: string;
}

export interface Category {
  id: number;
  cname: string;
}

export interface Review {
  id: number;
  user_id: number;
  time_review_posted: string;
  title: string;
  review_text: string;
  artwork_id?: number;
  artwork_title?: string;
  artist_name?: string;
  approved?: boolean;
  removed?: boolean;
  name?: string; // for joined user name
}

export interface OrderItem {
  thumbnail?: string;
  cname?: string;
  tags?: Tag[];
  price: number;
  quantity: number;
  id: number;
  cost: number;
  title: string;
  artist_name: string;
}

export interface Order {
  time_ordered: string;
  totalCost: number;
  items: OrderItem[];
  user?: { user_name: string; user_id: number };
}

export interface Message {
  id: number;
  email: string;
  message_title: string;
  message_txt: string;
  message_time: string;
}

export interface SearchParams {
  title: string;
  artist_name: string;
  category_id: string;
  order: string;
  n: number;
  min: number;
  max: number;
  only_featured: boolean;
}

export interface ArtworkSent {
  title: string;
  artist_name: string;
  price: number;
  quantity: number;
  description: string;
  category_id: number;
  tags: string[];
}

export interface InvoiceData {
  items: { artwork_id: number; quantity: number; price: number }[];
  totalCost: number;
  billing_address: string;
  shipping_address: string;
  phone_number: string;
}

// Formik Types - using FormikProps from formik
import { FormikProps } from "formik";

export type SearchFormikInstance = FormikProps<SearchParams>;
export type UserFormikInstance = FormikProps<User>;
export type ArtworkFormikInstance = FormikProps<ArtworkSent>;
