"use client";
import React from "react";

import { Col } from "react-bootstrap";

import SubPageTitle from "@/components/layout/SubPageTitle/SubPageTitle";

import useOrders from "./useOrders";

function Orders() {
  const { t, ordersRepresented } = useOrders();

  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title={t("app.admin.orders.title")} />
      {ordersRepresented}
    </Col>
  );
}

export default Orders;
