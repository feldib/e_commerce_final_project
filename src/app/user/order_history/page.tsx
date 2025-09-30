"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { USERS_URL } from "@/utils/constants";

import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import { useI18n } from "@/components/providers/I18nProvider";
import SubPageTitle from "@/components/SubPageTitle";

import { Order } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

function OrderHistory() {
  const { t } = useI18n();
  function renderOrderList(orders: Order[]): React.JSX.Element {
    const len = orders.length;
    return (
      <>
        {orders.map((orderData, index) => (
          <OrderSummaryComponent
            key={index}
            title={`${t("app.user.order_history.order")} ${len - index}`}
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
          <Col className="text-center">
            {t("app.user.order_history.no_orders")}
          </Col>
        </Row>
      );
    }
    return renderOrderList(orders);
  });

  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title={t("app.user.order_history.title")} />
      {ordersRepresented}
    </Col>
  );
}

export default OrderHistory;
