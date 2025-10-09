"use client";

import React from "react";

import { Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork, ShoppingCartItem } from "@/fetching/types";

import BuyTableDataLines from "./BuyTableDataLines";

import { getShoppingCartFromLocalStorage } from "@/helpers/shoppingCartHelpers";
import { renderData } from "@/helpers/tableHelpers";
import useLoading from "@/hooks/useLoading";

type BuyTableProps = {
  dataLines: Artwork[];
  recommendation?: boolean;
  orderSummary?: boolean;
};

function BuyTable({
  dataLines,
  recommendation = false,
  orderSummary = false,
}: BuyTableProps) {
  const { t } = useI18n();

  function makeRows(dataLinesGenerated: Artwork[]): React.JSX.Element {
    return (
      <>
        {dataLinesGenerated.map((line: Artwork, index: number) => {
          return (
            <BuyTableDataLines
              index={index}
              key={index}
              line={line}
              orderSummary={orderSummary}
              recommendation={recommendation}
            />
          );
        })}
      </>
    );
  }

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
    renderData(artworks, makeRows, t("common.no_results"))
  );

  return (
    <Row className="text-center mx-auto">
      <table className="mb-3">
        <thead>
          <tr>
            <th aria-label={t("common.aria_label_thumbnail")}></th>
            <th>{t("common.title")}</th>
            <th className="d-none d-md-table-cell">{t("common.artist")}</th>
            <th>{t("common.price")}</th>
            <th
              className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}
            >
              {t("common.quantity")}
            </th>
            <th
              className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}
            >
              {t("common.tags")}
            </th>
            <th
              className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}
            >
              {t("common.categories")}
            </th>
            <th>{orderSummary && t("common.total_cost")}</th>
          </tr>
        </thead>

        <tbody>{dataLinesGenerated}</tbody>
      </table>
    </Row>
  );
}

export default BuyTable;
