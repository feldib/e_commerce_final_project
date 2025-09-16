"use client";
import React from "react";
import { Col } from "react-bootstrap";
import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";
import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import { users_url } from "@/utils/api_constants";
import SubPageTitle from "@/components/SubPageTitle";
import { Order } from "@/fetching/types";

function OrderHistory() {
  function representOrderDataCollection(
    orderDataCollection: Order[]
  ): React.JSX.Element {
    const len = orderDataCollection.length;
    return (
      <>
        {orderDataCollection.map((orderData, index) => (
          <OrderSummaryComponent
            key={index}
            title={`Order ${len - index}`}
            items={orderData.items}
            totalCost={orderData.totalCost}
          />
        ))}
      </>
    );
  }

  const orderDataCollection = useAxios(`/${users_url}/get_orders_of_user`);
  const ordersRepresented = useLoading(orderDataCollection, (orders) =>
    representOrderDataCollection(orders as Order[])
  );
  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title="Order history" />
      {ordersRepresented}
    </Col>
  );
}

export default OrderHistory;
