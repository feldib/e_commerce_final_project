"use client";
import React from "react";

import { useParams, useRouter } from "next/navigation";

import { Col } from "react-bootstrap";

import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import { useI18n } from "@/components/providers/I18nProvider";
import SubPageTitle from "@/components/SubPageTitle";

import { getOrderHistory } from "@/fetching/fetching";
import { Order } from "@/fetching/types";

import useLoading from "@/hooks/useLoading";

function UserOrderHistory() {
  const [orderDataCollection, setOrderDataCollection] =
    React.useState<Order[]>();
  const router = useRouter();
  const { user_id: userIdString } = useParams();
  const userId = Number(userIdString);
  const { t } = useI18n();

  React.useEffect(() => {
    getOrderHistory(userId).then((orders: Order[]) => {
      setOrderDataCollection(orders);
    });
  }, [userId]);

  function renderOrderList(orders: Order[]) {
    const len = orders.length;
    return (
      <>
        {orders.map((orderData: Order, index: number) => {
          return (
            <OrderSummaryComponent
              key={index}
              title={`${t("app.user.order_history.order")} ${len - index}`}
              items={orderData.items}
              totalCost={orderData.totalCost}
            />
          );
        })}
      </>
    );
  }

  const ordersRepresented = useLoading(
    orderDataCollection || [],
    renderOrderList,
  );
  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title={t("app.user.order_history.title")} />
      {ordersRepresented}
      <FloatingBackButton router={router} />
    </Col>
  );
}

export default UserOrderHistory;
