"use client";
import React from "react";
import { Row } from "react-bootstrap";
import BuyTable from "./tables/BuyTable";
import { UserDataContext } from "@/components/providers/UserDataProvider";

type OrderSummaryComponentProps = {
  title?: string;
  items: any;
  totalCost: number;
  button?: React.ReactNode;
};

function OrderSummaryComponent(props: OrderSummaryComponentProps) {
  const { user } = React.useContext(UserDataContext);

  return (
    <Row className="mb-3 floating-element">
      <Row>
        {props.title && (
          <Row className="mb-2 mb-3">
            <h2 className="text-center">{props.title}</h2>
          </Row>
        )}

        {user && (
          <Row className="mb-2 mt-5 mb-3">
            <h3 className="text-start">User: {user.user_name}</h3>
          </Row>
        )}

        <BuyTable
          theadNeeded={true}
          dataLines={props.items}
          orderSummary={true}
          reccomendation={false}
        />
      </Row>

      <Row className="mt-4 text-start">
        {props.items && <h2>Order Summary: € {props.totalCost}</h2>}
      </Row>
      {props.button && <>{props.button}</>}
    </Row>
  );
}

export default OrderSummaryComponent;
