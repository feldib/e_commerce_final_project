"use client";

import React from "react";

import { Row } from "react-bootstrap";

import BuyTableDataLines from "@/components/datalines/BuyTableDataLines";
import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork, ShoppingCartItem } from "@/fetching/types";

import { getShoppingCartFromLocalStorage } from "@/helpers/shoppingCartHelpers";
import { renderData } from "@/helpers/tableHelpers";
import useLoading from "@/hooks/useLoading";

type BuyTableProps = {
  dataLines: Artwork[];
  recommendation?: boolean;
  orderSummary?: boolean;
  theadNeeded: boolean;
};

function BuyTable({
  dataLines,
  recommendation = false,
  orderSummary = false,
  theadNeeded = true,
}: BuyTableProps) {
  const { t } = useI18n();

  function makeRows(dataLinesGenerated: Artwork[]): React.JSX.Element {
    return (
      <>
        {dataLinesGenerated.map((line: Artwork, index: number) => {
          return (
            <BuyTableDataLines
              recommendation={recommendation}
              line={line}
              index={index}
              key={index}
              orderSummary={orderSummary}
            />
          );
        })}
      </>
    );
  }

  const dataLinesGenerated = useLoading(
    dataLines,
    (dataLines): React.JSX.Element => {
      return renderData(
        (dataLines as Artwork[]).filter((line: Artwork) => {
          const shoppingCart = getShoppingCartFromLocalStorage();

          if (shoppingCart.length) {
            const existingRecordIndex = shoppingCart.findIndex(
              (item: ShoppingCartItem) => item.artwork_id === line.id,
            );

            if (
              existingRecordIndex >= 0 &&
              shoppingCart[existingRecordIndex].quantity > 0
            ) {
              return (
                line.quantity - shoppingCart[existingRecordIndex].quantity > 0
              );
            } else {
              return line.quantity;
            }
          } else {
            return line.quantity;
          }
        }),
        makeRows,
        t("common.no_results"),
      );
    },
  );

  return (
    <Row className="text-center mx-auto">
      <table className="mb-3">
        {theadNeeded && (
          <thead>
            <tr>
              <th></th>
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
        )}

        <tbody>{dataLinesGenerated}</tbody>
      </table>
    </Row>
  );
}

export default BuyTable;
