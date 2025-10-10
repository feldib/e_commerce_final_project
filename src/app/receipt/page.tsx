"use client";
import React from "react";

import { Container } from "react-bootstrap";

import BackToShopButton from "@/components/buttons/BackToShopButton/BackToShopButton";
import PageTitle from "@/components/layout/PageTitle/PageTitle";
import OrderSummaryComponent from "@/components/shopping/OrderSummaryComponent/OrderSummaryComponent";

import useReceipt from "./useReceipt";

function ReceiptPage() {
  const { t, currentOrderData, handleBackToShopClick } = useReceipt();

  return (
    <Container className="pb-5">
      <PageTitle title={t("app.receipt.title")} />

      <OrderSummaryComponent
        button={<BackToShopButton onClick={handleBackToShopClick} />}
        items={currentOrderData.items}
        totalCost={currentOrderData.totalCost}
      />
    </Container>
  );
}

export default ReceiptPage;
