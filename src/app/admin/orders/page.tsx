"use client";
import React from "react";
import { Col } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";
import { admin_url } from "../../../utils/api_constants";
import OrderSummaryComponent from "../../../components/OrderSummaryComponent";

function Orders() {
  function representOrderDataCollection(orderDataCollection: any) {
    const len = orderDataCollection.length;
    return orderDataCollection.map((orderData: any, index: number) => {
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

  const orders = useAxios(`/${admin_url}/get_orders`);
  const ordersRepresented = useLoading(orders, representOrderDataCollection);
  return <Col className="mb-5 pb-5">{ordersRepresented}</Col>;
}

export default Orders;
