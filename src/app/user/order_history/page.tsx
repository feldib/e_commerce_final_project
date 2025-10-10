"use client";
import React from "react";

import { Col } from "react-bootstrap";

import SubPageTitle from "@/components/layout/SubPageTitle/SubPageTitle";

import useOrderHistory from "./useOrderHistory";

function OrderHistory() {
  const { t, ordersRepresented } = useOrderHistory();

  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title={t("app.user.order_history.title")} />
      {ordersRepresented}
    </Col>
  );
}

export default OrderHistory;
