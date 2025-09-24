"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";
import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import { users_url } from "@/utils/apiConstants";
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

  const orderDataCollection = useAxios(
    `/${users_url}/get_orders_of_user`
  ) as Order[];
  const ordersRepresented = useLoading(orderDataCollection, (orders) => {
    if (orders.length === 0) {
      return (
        <Row className="mb-3 floating-element">
          <Col className="text-center">--- No orders ---</Col>
        </Row>
      );
    }
    return representOrderDataCollection(orders);
  });

  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title="Order history" />
      {ordersRepresented}
    </Col>
  );
}

export default OrderHistory;
