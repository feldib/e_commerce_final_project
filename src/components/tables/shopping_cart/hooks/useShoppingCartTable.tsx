"use client";

import React from "react";

import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork } from "@/fetching/types";

import ShoppingCartDataLines from "../ShoppingCartDataLines";

import { renderData } from "@/helpers/tableHelpers";
import useLoading from "@/hooks/useLoading";

type UseShoppingCartTableProps = {
  dataLines: Artwork[];
  recommendation?: boolean;
  changeCosts: (index: number, cost: number) => void;
};

type UseShoppingCartTableReturn = {
  dataLinesGenerated: React.ReactNode;
  t: (key: string) => string;
};

function useShoppingCartTable({
  dataLines,
  recommendation = false,
  changeCosts,
}: UseShoppingCartTableProps): UseShoppingCartTableReturn {
  const { t } = useI18n();

  function makeRows(dataLinesGenerated: Artwork[]): React.JSX.Element {
    return (
      <>
        {dataLinesGenerated.map((line: Artwork, index: number) => {
          return (
            <ShoppingCartDataLines
              changeCosts={changeCosts}
              index={index}
              key={index}
              line={line}
              recommendation={recommendation}
            />
          );
        })}
      </>
    );
  }

  const dataLinesGenerated = useLoading(
    dataLines,
    (dataLines): React.JSX.Element => {
      return renderData(dataLines, makeRows, t("common.no_result.no_results"));
    }
  );

  return {
    dataLinesGenerated,
    t,
  };
}

export default useShoppingCartTable;
