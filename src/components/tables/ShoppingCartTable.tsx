"use client";
import React from "react";

import { Row } from "react-bootstrap";

import ShoppingCartDataLines from "@/components/datalines/ShoppingCartDataLines";
import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork } from "@/fetching/types";

import { renderData } from "@/helpers/helpers";
import useLoading from "@/hooks/useLoading";

type ShoppingCartTableProps = {
  dataLines: Artwork[];
  recommendation?: boolean;
  changeCosts: (index: number, cost: number) => void;
  theadNeeded: boolean;
};

function ShoppingCartTable({
  dataLines,
  recommendation = false,
  changeCosts,
  theadNeeded,
}: ShoppingCartTableProps) {
  const { t } = useI18n();

  function makeRows(dataLinesGenerated: Artwork[]): React.JSX.Element {
    return (
      <>
        {dataLinesGenerated.map((line: Artwork, index: number) => {
          return (
            <ShoppingCartDataLines
              key={index}
              recommendation={recommendation}
              line={line}
              index={index}
              changeCosts={changeCosts}
            />
          );
        })}
      </>
    );
  }
  const dataLinesGenerated = useLoading(
    dataLines,
    (dataLines): React.JSX.Element => {
      return renderData(dataLines, makeRows, t("common.no_results"));
    }
  );
  return (
    <Row className="text-center">
      <table>
        {theadNeeded && (
          <thead>
            <tr>
              <th></th>
              <th>{t("common.title")}</th>
              <th>{t("common.artist")}</th>
              <th>{t("common.total_cost")}</th>
              <th>{t("common.quantity")}</th>
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
              <th></th>
            </tr>
          </thead>
        )}

        <tbody>{dataLinesGenerated}</tbody>
      </table>
    </Row>
  );
}

export default ShoppingCartTable;
