"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { ADMIN_URL } from "@/utils/constants";

import SubPageTitle from "@/components/layout/SubPageTitle";
import { useI18n } from "@/components/providers/I18nProvider";
import OrderSummaryComponent from "@/components/shopping/OrderSummaryComponent";

import { Order } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

function Orders() {
  const { t } = useI18n();
  function renderOrderList(orders: Order[]) {
    const len = orders.length;
    return orders.map((orderData: Order, index: number) => {
      return (
        <OrderSummaryComponent
          items={orderData.items}
          key={index}
          orderUser={orderData.user}
          title={`${t("app.admin.orders.order")} ${len - index}`}
          totalCost={orderData.totalCost}
        />
      );
    });
  }

  const orders = useAxios(`/${ADMIN_URL}/orders`) as Order[];

  const ordersRepresented = useLoading(orders, (orders) => {
    if (orders.length === 0) {
      return (
        <Row className="mb-3 floating-element">
          <Col className="text-center">{t("app.admin.orders.no_orders")}</Col>
        </Row>
      );
    }
    return <>{renderOrderList(orders)}</>;
  });

  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title={t("app.admin.orders.title")} />
      {ordersRepresented}
    </Col>
  );
}

export default Orders;
