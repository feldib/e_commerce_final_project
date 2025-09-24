import React from "react";

import { Row } from "react-bootstrap";

import BuyTableDataLines from "@/components/datalines/BuyTableDataLines";

import { Artwork, ShoppingCartItem } from "@/fetching/types";

import { getShoppingCartFromLocalStorage,renderData } from "@/helpers/helpers";
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
  function makeDataLines(dataLinesGenerated: Artwork[]): React.JSX.Element[] {
    return dataLinesGenerated.map((line: Artwork, index: number) => {
      return (
        <BuyTableDataLines
          recommendation={recommendation}
          line={line}
          index={index}
          key={index}
          orderSummary={orderSummary}
        />
      );
    });
  }

  const dataLinesGenerated = useLoading(
    dataLines,
    (dataLines): React.JSX.Element => {
      return renderData(
        (dataLines as Artwork[]).filter((line: Artwork) => {
          const shoppingCart = getShoppingCartFromLocalStorage();

          if (shoppingCart.length) {
            const existingRecordIndex = shoppingCart.findIndex(
              (item: ShoppingCartItem) => item.artwork_id === line.id
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
        makeDataLines
      );
    }
  );

  return (
    <Row className="text-center mx-auto">
      <table className="mb-3">
        {theadNeeded && (
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th className="d-none d-md-table-cell">Artist</th>
              <th>Price</th>
              <th
                className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}
              >
                Quantity
              </th>
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
              <th>{orderSummary && "Total Cost"}</th>
            </tr>
          </thead>
        )}

        <tbody>{dataLinesGenerated}</tbody>
      </table>
    </Row>
  );
}

export default BuyTable;
