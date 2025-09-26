import React from "react";

import { Row } from "react-bootstrap";

import ShoppingCartDataLines from "@/components/datalines/ShoppingCartDataLines";

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
  function makeDataLines(dataLinesGenerated: Artwork[]) {
    return dataLinesGenerated.map((line: Artwork, index: number) => {
      return (
        <ShoppingCartDataLines
          key={index}
          recommendation={recommendation}
          line={line}
          index={index}
          changeCosts={changeCosts}
        />
      );
    });
  }
  const dataLinesGenerated = useLoading(dataLines, (dataLines) => {
    return renderData(dataLines, makeDataLines);
  });
  return (
    <Row className="text-center">
      <table>
        {theadNeeded && (
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Total cost</th>
              <th>Quantity</th>
              <th
                className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}
              >
                Tags
              </th>
              <th
                className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}
              >
                Categories
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
