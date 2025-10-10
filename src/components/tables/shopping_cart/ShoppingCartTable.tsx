"use client";
import React from "react";

import { Row } from "react-bootstrap";

import { Artwork } from "@/fetching/types";

import useShoppingCartTable from "./hooks/useShoppingCartTable";

type ShoppingCartTableProps = {
  dataLines: Artwork[];
  recommendation?: boolean;
  changeCosts: (index: number, cost: number) => void;
};

function ShoppingCartTable({
  dataLines,
  recommendation = false,
  changeCosts,
}: ShoppingCartTableProps) {
  const { dataLinesGenerated, t } = useShoppingCartTable({
    dataLines,
    changeCosts,
    recommendation,
  });
  return (
    <Row className="text-center">
      <table>
        <thead>
          <tr>
            <th aria-label={t("common.aria_labels.aria_label_thumbnail")}></th>
            <th>{t("common.fields.title")}</th>
            <th>{t("common.fields.artist")}</th>
            <th>{t("common.shop.total_cost")}</th>
            <th>{t("common.fields.quantity")}</th>
            <th
              className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}
            >
              {t("common.fields.tags")}
            </th>
            <th
              className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}
            >
              {t("common.fields.categories")}
            </th>
            <th aria-label={t("common.aria_labels.aria_label_actions")}></th>
          </tr>
        </thead>

        <tbody>{dataLinesGenerated}</tbody>
      </table>
    </Row>
  );
}

export default ShoppingCartTable;
