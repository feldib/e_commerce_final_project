import axiosConfigured from "@/utils/axiosConfigured";
import { ADMIN_URL, SERVER_URL } from "@/utils/constants";
import { searchArtworksGraphQL } from "@/utils/graphqlSearch";

import { Artwork, SearchParams, ShoppingCartItem } from "./types";

// ===================
// Artwork-related
// ===================

export const getArtworkSearchResults = async (
  objects: SearchParams,
  pageNumber: number,
  admin: boolean = false
): Promise<Artwork[]> => {
  try {
    return await searchArtworksGraphQL(objects, pageNumber, admin);
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
