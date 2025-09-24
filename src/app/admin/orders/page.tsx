"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";
import { admin_url } from "@/utils/api_constants";
import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import { Order } from "@/fetching/types";
import SubPageTitle from "@/components/SubPageTitle";

function Orders() {
  function representOrderDataCollection(orderDataCollection: Order[]) {
    const len = orderDataCollection.length;
    return orderDataCollection.map((orderData: Order, index: number) => {
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

  const orders = useAxios(`/${admin_url}/orders`) as Order[];

  const ordersRepresented = useLoading(orders, (orders) => {
    if (orders.length === 0) {
      return (
        <Row className="mb-3 floating-element">
          <Col className="text-center">--- No orders ---</Col>
        </Row>
      );
    }
    return <>{representOrderDataCollection(orders)}</>;
  });

  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title="Completed orders by users" />
      {ordersRepresented}
    </Col>
  );
}

export default Orders;
