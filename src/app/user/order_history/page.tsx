"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { USERS_URL } from "@/utils/apiConstants";

import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import SubPageTitle from "@/components/SubPageTitle";

import { Order } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

function OrderHistory() {
  function renderOrderList(orders: Order[]): React.JSX.Element {
    const len = orders.length;
    return (
      <>
        {orders.map((orderData, index) => (
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
    `/${USERS_URL}/get_orders_of_user`
  ) as Order[];
  const ordersRepresented = useLoading(orderDataCollection, (orders) => {
    if (orders.length === 0) {
      return (
        <Row className="mb-3 floating-element">
          <Col className="text-center">--- No orders ---</Col>
        </Row>
      );
    }
    return renderOrderList(orders);
  });

  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title="Order history" />
      {ordersRepresented}
    </Col>
  );
}

export default OrderHistory;
