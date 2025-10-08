import { Artwork, SearchParams } from "@/fetching/types";

import { SERVER_URL } from "./constants";

export const searchArtworksGraphQL = async (
  searchParams: SearchParams,
  pageNumber: number,
  admin: boolean = false
): Promise<Artwork[]> => {
  try {
    const input = {
      ...searchParams,
      // Validate price range: if max < min, invalidate max
      max:
        searchParams.max &&
        searchParams.min &&
        searchParams.max < searchParams.min
          ? undefined
          : searchParams.max,
      offset: pageNumber > 0 ? (pageNumber - 1) * searchParams.n : 0,
      admin, // Pass admin flag to backend
    };

    const query = `
      query SearchArtworks($input: SearchInput) {
        searchArtworks(input: $input) {
          id
          title
          artist_name
          price
          category_id
          featured
          created_at
          thumbnail
          quantity
          tags {
            id
            tname
          }
          other_pictures
        }
      }
    `;

    const response = await fetch(`${SERVER_URL}/graphql-search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        query,
        variables: { input },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    // Convert GraphQL response to match existing Artwork interface
    return result.data.searchArtworks.map(
      (artwork: {
        id: number;
        title: string;
        artist_name: string;
        price: number;
        category_id: number;
        featured: boolean;
        created_at: string;
        thumbnail?: string;
        quantity?: number;
        tags?: Array<{ id: number; tname: string }>;
        other_pictures?: string[];
      }) => ({
        ...artwork,
        date_added: artwork.created_at,
      })
    );
  } catch (error) {
    throw error;
  }
};
