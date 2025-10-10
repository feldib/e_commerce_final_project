"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { ADMIN_URL } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import OrderSummaryComponent from "@/components/shopping/OrderSummaryComponent/OrderSummaryComponent";

import { Order } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

type UseOrdersReturn = {
  t: (key: string) => string;
  ordersRepresented: React.ReactNode;
};

function useOrders(): UseOrdersReturn {
  const { t } = useI18n();

  function renderOrderList(orders: Order[]) {
    const len = orders.length;
    return orders.map((orderData: Order, index: number) => {
      return (
        <OrderSummaryComponent
          items={orderData.items}
          key={index}
          orderUser={orderData.user}
          title={`${t("common.shop.order")} ${len - index}`}
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
          <Col className="text-center">{t("common.no_result.no_orders")}</Col>
        </Row>
      );
    }
    return <>{renderOrderList(orders)}</>;
  });

  return {
    t,
    ordersRepresented,
  };
}

export default useOrders;
