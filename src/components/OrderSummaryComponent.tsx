import React from "react";
import { Row, Col } from "react-bootstrap";
import BuyTable from "./tables/BuyTable";
import { Artwork } from "@/fetching/types";

type OrderSummaryComponentProps = {
  title?: string;
  items: Artwork[];
  totalCost: number;
  button?: React.ReactNode;
  orderUser?: { user_name: string; user_id: number };
};

function OrderSummaryComponent({
  title,
  items,
  totalCost,
  button,
  orderUser,
}: OrderSummaryComponentProps) {
  return (
    <Row className="mb-3 floating-element">
      {items.length !== 0 ? (
        <>
          <Row>
            {title && (
              <Row className="mb-2 mb-3">
                <h2 className="text-center">{title}</h2>
              </Row>
            )}

            {orderUser && (
              <Row className="mb-2 mt-5 mb-3">
                <h3 className="text-start">User: {orderUser.user_name}</h3>
              </Row>
            )}

            <BuyTable
              theadNeeded={true}
              dataLines={items}
              orderSummary={true}
              reccomendation={false}
            />
          </Row>

          <Row className="mt-4 text-start">
            {items && <h2>Order Summary: € {totalCost}</h2>}
          </Row>
          {button && <>{button}</>}
        </>
      ) : (
        <Col className="text-center">--- No orders ---</Col>
      )}
    </Row>
  );
}

export default OrderSummaryComponent;
