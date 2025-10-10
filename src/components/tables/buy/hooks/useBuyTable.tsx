"use client";

import React from "react";

import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork, ShoppingCartItem } from "@/fetching/types";

import { getShoppingCartFromLocalStorage } from "@/helpers/shoppingCartHelpers";
import { renderData } from "@/helpers/tableHelpers";
import useLoading from "@/hooks/useLoading";

type UseBuyTableProps = {
  dataLines: Artwork[];
  makeRows: (dataLinesGenerated: Artwork[]) => React.JSX.Element;
};

type UseBuyTableReturn = {
  dataLinesGenerated: React.ReactNode;
  t: (key: string) => string;
};

function useBuyTable({
  dataLines,
  makeRows,
}: UseBuyTableProps): UseBuyTableReturn {
  const { t } = useI18n();

  // Function to filter artworks based on availability and shopping cart contents
  const getAvailableArtworks = React.useCallback((artworks: Artwork[]) => {
    const shoppingCart = getShoppingCartFromLocalStorage();

    return artworks.filter((artwork: Artwork) => {
      if (!shoppingCart.length) {
        return artwork.quantity > 0;
      }

      const cartItem = shoppingCart.find(
        (item: ShoppingCartItem) => item.artwork_id === artwork.id
      );

      if (cartItem && cartItem.quantity > 0) {
        return artwork.quantity - cartItem.quantity > 0;
      }

      return artwork.quantity > 0;
    });
  }, []);

  // Memoize filtered artworks to avoid recalculating on every render
  const availableArtworks = React.useMemo(
    () => getAvailableArtworks(dataLines),
    [dataLines, getAvailableArtworks]
  );

  const dataLinesGenerated = useLoading(availableArtworks, (artworks) =>
    renderData(artworks, makeRows, t("common.no_result.no_results"))
  );

  return {
    dataLinesGenerated,
    t,
  };
}

export default useBuyTable;
