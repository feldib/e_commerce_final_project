import React from "react";
import { Row } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import ShoppingCartDataLines from "../datalines/ShoppingCartDataLines";
import { presentData } from "../../helpers/helpers";
import { Artwork } from "@/fetching/types";

type ShoppingCartTableProps = {
  dataLines: Artwork[];
  reccomendation?: boolean;
  changeCosts: (index: number, cost: number) => void;
  theadNeeded: boolean;
};

function ShoppingCartTable(props: ShoppingCartTableProps) {
  function makeDataLines(dataLines: Artwork[]) {
    return dataLines.map((line: Artwork, index: number) => {
      return (
        <ShoppingCartDataLines
          key={index}
          reccomendation={props.reccomendation}
          line={line}
          index={index}
          changeCosts={props.changeCosts}
        />
      );
    });
  }
  const dataLines = useLoading(props.dataLines, (dataLines) => {
    return presentData(dataLines, makeDataLines);
  });
  return (
    <Row className="text-center">
      <table>
        {props.theadNeeded && (
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Total cost</th>
              <th>Quantity</th>
              <th
                className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}
              >
                Tags
              </th>
              <th
                className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}
              >
                Categories
              </th>
              <th></th>
            </tr>
          </thead>
        )}

        <tbody>{dataLines}</tbody>
      </table>
    </Row>
  );
}

export default ShoppingCartTable;
