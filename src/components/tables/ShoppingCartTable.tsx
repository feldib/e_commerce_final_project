import React from "react";
import { Row } from "react-bootstrap";
import useLoading from "@/hooks/useLoading";
import ShoppingCartDataLines from "@/components/datalines/ShoppingCartDataLines";
import { presentData } from "@/helpers/helpers";
import { Artwork } from "@/fetching/types";

type ShoppingCartTableProps = {
  dataLines: Artwork[];
  reccomendation?: boolean;
  changeCosts: (index: number, cost: number) => void;
  theadNeeded: boolean;
};

function ShoppingCartTable({
  dataLines,
  reccomendation = false,
  changeCosts,
  theadNeeded,
}: ShoppingCartTableProps) {
  function makeDataLines(dataLinesGenerated: Artwork[]) {
    return dataLinesGenerated.map((line: Artwork, index: number) => {
      return (
        <ShoppingCartDataLines
          key={index}
          reccomendation={reccomendation}
          line={line}
          index={index}
          changeCosts={changeCosts}
        />
      );
    });
  }
  const dataLinesGenerated = useLoading(dataLines, (dataLines) => {
    return presentData(dataLines, makeDataLines);
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
                className={`${reccomendation ? "d-none" : "d-none d-md-table-cell"}`}
              >
                Tags
              </th>
              <th
                className={`${reccomendation ? "d-none" : "d-none d-md-table-cell"}`}
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
