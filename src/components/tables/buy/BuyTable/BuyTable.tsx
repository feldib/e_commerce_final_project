"use client";

import React from "react";

import { Row } from "react-bootstrap";

import { Artwork } from "@/fetching/types";

import BuyTableDataLines from "../BuyTableDataLines/BuyTableDataLines";
import useBuyTable from "./useBuyTable";

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

  const { dataLinesGenerated, t } = useBuyTable({
    dataLines,
    makeRows,
  });

  return (
    <Row className="text-center mx-auto">
      <table className="mb-3">
        <thead>
          <tr>
            <th aria-label={t("common.aria_labels.aria_label_thumbnail")}></th>
            <th>{t("common.fields.title")}</th>
            <th className="d-none d-md-table-cell">
              {t("common.fields.artist")}
            </th>
            <th>{t("common.fields.price")}</th>
            <th
              className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}
            >
              {t("common.fields.quantity")}
            </th>
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
            <th>{orderSummary && t("common.shop.total_cost")}</th>
          </tr>
        </thead>

        <tbody>{dataLinesGenerated}</tbody>
      </table>
    </Row>
  );
}

export default BuyTable;
