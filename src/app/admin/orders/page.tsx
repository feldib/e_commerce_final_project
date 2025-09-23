"use client";
import React from "react";
import { Col } from "react-bootstrap";
import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";
import { admin_url } from "@/utils/api_constants";
import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import { Order } from "@/fetching/types";

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
        />
      );
    });
  }

  const orders = useAxios(`/${admin_url}/orders`);
  const ordersRepresented = useLoading(orders, (orders) => (
    <>{representOrderDataCollection(orders as Order[])}</>
  ));
  return <Col className="mb-5 pb-5">{ordersRepresented}</Col>;
}

export default Orders;
