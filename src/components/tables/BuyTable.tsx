import React from "react";
import { Row } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import BuyTableDataLines from "../datalines/BuyTableDataLines";
import {
  presentData,
  getShoppingCartFromLocalStorage,
} from "@/helpers/helpers";
import { Artwork, ShoppingCartItem } from "../../fetching/types";

type BuyTableProps = {
  dataLines: Artwork[];
  reccomendation?: boolean;
  orderSummary?: boolean;
  theadNeeded: boolean;
};

function BuyTable(props: BuyTableProps) {
  function makeDataLines(dataLines: Artwork[]): React.JSX.Element[] {
    return dataLines.map((line: Artwork, index: number) => {
      return (
        <BuyTableDataLines
          reccomendation={props.reccomendation}
          line={line}
          index={index}
          key={index}
          orderSummary={props.orderSummary}
        />
      );
    });
  }

  const dataLines = useLoading(
    props.dataLines,
    (dataLines): React.JSX.Element => {
      return presentData(
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
        {props.theadNeeded && (
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th className="d-none d-md-table-cell">Artist</th>
              <th>Price</th>
              <th
                className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}
              >
                Quantity
              </th>
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
              <th>{props.orderSummary && "Total Cost"}</th>
            </tr>
          </thead>
        )}

        <tbody>{dataLines}</tbody>
      </table>
    </Row>
  );
}

export default BuyTable;
