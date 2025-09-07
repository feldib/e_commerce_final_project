import React from "react";
import { Row } from "react-bootstrap";
import BuyTable from "./tables/BuyTable";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import { OrderItem } from "../fetching/types";

type OrderSummaryComponentProps = {
  title?: string;
  items: OrderItem[];
  totalCost: number;
  button?: React.ReactNode;
};

function OrderSummaryComponent({
  title,
  items,
  totalCost,
  button,
}: OrderSummaryComponentProps) {
  const { user } = React.useContext(UserDataContext);

  return (
    <Row className="mb-3 floating-element">
      <Row>
        {title && (
          <Row className="mb-2 mb-3">
            <h2 className="text-center">{title}</h2>
          </Row>
        )}

        {user && (
          <Row className="mb-2 mt-5 mb-3">
            <h3 className="text-start">User: {user.user_name}</h3>
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
    </Row>
  );
}

export default OrderSummaryComponent;
