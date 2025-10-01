"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { Button, Col, Container, Row } from "react-bootstrap";

import OrderSummaryComponent from "@/components/OrderSummaryComponent";
import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork } from "@/fetching/types";

function ReceiptPage() {
  const { t } = useI18n();
  const [currentOrderData, setCurrentOrderData] = useState<{
    items: Artwork[];
    totalCost: number;
  }>({ items: [], totalCost: 0 });

  useEffect(() => {
    const currentOrderString = localStorage.getItem("currentOrder");
    setCurrentOrderData(
      currentOrderString
        ? JSON.parse(currentOrderString)
        : { items: [], totalCost: 0 },
    );
  }, []);

  return (
    <Container className="pb-5">
      <PageTitle title={t("app.receipt.title")} />

      <OrderSummaryComponent
        items={currentOrderData.items}
        totalCost={currentOrderData.totalCost}
        button={
          <Row>
            <Col className="text-center mb-5">
              <Link href="/">
                <Button
                  className="submit"
                  onClick={() => {
                    localStorage.removeItem("currentOrder");
                  }}
                >
                  {t("app.receipt.back_to_shop")}
                </Button>
              </Link>
            </Col>
          </Row>
        }
      />
    </Container>
  );
}

export default ReceiptPage;
