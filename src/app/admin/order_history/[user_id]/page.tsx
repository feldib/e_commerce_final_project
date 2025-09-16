"use client";
import React from "react";
import { Col } from "react-bootstrap";
import useLoading from "@/hooks/useLoading";
import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import { getOrderHistory } from "@/fetching/fetching";
import SubPageTitle from "@/components/SubPageTitle";
import FloatingBackButton from "@/components/buttons/FloatingBackButton";
import { useRouter, useParams } from "next/navigation";
import { Order } from "@/fetching/types";

function UserOrderHistory() {
  const [orderDataCollection, setOrderDataCollection] =
    React.useState<Order[]>();
  const router = useRouter();
  const { user_id: userIdString } = useParams();
  const userId = Number(userIdString);

  React.useEffect(() => {
    getOrderHistory(userId).then((orders: Order[]) => {
      setOrderDataCollection(orders);
    });
  });

  function representOrderDataCollection(orders: Order[]) {
    const len = orders.length;
    return (
      <>
        {orders.map((orderData: Order, index: number) => {
          return (
            <OrderSummaryComponent
              key={index}
              title={`Order ${len - index}`}
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
    representOrderDataCollection
  );
  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title="Order history" />
      {ordersRepresented}
      <FloatingBackButton router={router} />
    </Col>
  );
}

export default UserOrderHistory;
