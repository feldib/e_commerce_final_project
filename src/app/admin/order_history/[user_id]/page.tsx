"use client";
import React from "react";

import { Col } from "react-bootstrap";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import SubPageTitle from "@/components/layout/SubPageTitle";

import useUserOrderHistory from "./useUserOrderHistory";

function UserOrderHistory() {
  const { t, ordersRepresented, router } = useUserOrderHistory();

  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title={t("app.user.order_history.title")} />
      {ordersRepresented}
      <FloatingBackButton router={router} />
    </Col>
  );
}

export default UserOrderHistory;
