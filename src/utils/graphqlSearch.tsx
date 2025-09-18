import { server_url } from "./api_constants";
import { SearchParams, Artwork } from "@/fetching/types";

export const searchArtworksGraphQL = async (
  searchParams: SearchParams,
  pageNumber: number
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
    };

    console.log("GraphQL Search Input:", input);

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
          cname
          quantity
          tags {
            id
            tname
          }
          other_pictures
        }
      }
    `;

    const response = await fetch(`${server_url}/graphql-search`, {
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
        cname?: string;
        quantity?: number;
        tags?: Array<{ id: number; tname: string }>;
        other_pictures?: string[];
      }) => ({
        ...artwork,
        date_added: artwork.created_at,
      })
    );
  } catch (error) {
    console.error("GraphQL Search Error:", error);
    throw error;
  }
};
