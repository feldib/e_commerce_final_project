"use client";
import { Col, Row, Container, Button } from "react-bootstrap";
import OrderSummaryComponent from "../../components/OrderSummaryComponent";
import Link from "next/link";
import PageTitle from "../../components/PageTitle";

import React, { useEffect, useState } from "react";

function ReceiptPage() {
  const [currentOrderData, setCurrentOrderData] = useState<{
    items: any[];
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
      <PageTitle title="Receipt" />

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
                  Back to Shop
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
