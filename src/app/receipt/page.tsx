"use client";
import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

import BackToShopButton from "@/components/buttons/BackToShopButton";
import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";
import OrderSummaryComponent from "@/components/shopping/OrderSummaryComponent";

import { Artwork } from "@/fetching/types";

function ReceiptPage() {
  const { t } = useI18n();
  const [currentOrderData, setCurrentOrderData] = useState<{
    items: Artwork[];
    totalCost: number;
  }>({ items: [], totalCost: 0 });

  const handleBackToShopClick = () => {
    localStorage.removeItem("currentOrder");
  };

  useEffect(() => {
    const currentOrderString = localStorage.getItem("currentOrder");
    setCurrentOrderData(
      currentOrderString
        ? JSON.parse(currentOrderString)
        : { items: [], totalCost: 0 }
    );
  }, []);

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
