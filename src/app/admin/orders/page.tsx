"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { ADMIN_URL } from "@/utils/constants";

import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import SubPageTitle from "@/components/SubPageTitle";

import { Order } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

function Orders() {
  function renderOrderList(orders: Order[]) {
    const len = orders.length;
    return orders.map((orderData: Order, index: number) => {
      return (
        <OrderSummaryComponent
          key={index}
          title={`Order ${len - index}`}
          items={orderData.items}
          totalCost={orderData.totalCost}
          orderUser={orderData.user}
        />
      );
    });
  }

  const orders = useAxios(`/${ADMIN_URL}/orders`) as Order[];

  const ordersRepresented = useLoading(orders, (orders) => {
    if (orders.length === 0) {
      return (
        <Row className="mb-3 floating-element">
          <Col className="text-center">--- No orders ---</Col>
        </Row>
      );
    }
    return <>{renderOrderList(orders)}</>;
  });

  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title="Completed orders by users" />
      {ordersRepresented}
    </Col>
  );
}

export default Orders;
