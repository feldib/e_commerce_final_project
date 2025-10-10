"use client";
import React from "react";

import { useParams, useRouter } from "next/navigation";

import { useI18n } from "@/components/providers/I18nProvider";
import OrderSummaryComponent from "@/components/shopping/OrderSummaryComponent";

import { getOrderHistory } from "@/fetching/fetching";
import { Order } from "@/fetching/types";

import useLoading from "@/hooks/useLoading";

function useUserOrderHistory() {
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
              items={orderData.items}
              key={index}
              title={`${t("app.user.order_history.order")} ${len - index}`}
              totalCost={orderData.totalCost}
            />
          );
        })}
      </>
    );
  }

  const ordersRepresented = useLoading(
    orderDataCollection || [],
    renderOrderList
  );

  return {
    t,
    ordersRepresented,
    router,
  };
}

export default useUserOrderHistory;
