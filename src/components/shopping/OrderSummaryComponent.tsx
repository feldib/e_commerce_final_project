"use client";

import React from "react";

import { Col, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";
import BuyTable from "@/components/tables/buy/BuyTable";

import { Artwork } from "@/fetching/types";

type OrderSummaryComponentProps = {
  title?: string;
  items: Artwork[];
  totalCost: number;
  button?: React.ReactNode;
  orderUser?: { user_name: string; user_id: number };
};

function OrderSummaryComponent({
  title,
  items,
  totalCost,
  button,
  orderUser,
}: OrderSummaryComponentProps) {
  const { t } = useI18n();

  return (
    <Row className="mb-3 floating-element">
      {items.length !== 0 ? (
        <>
          <Row>
            {title && (
              <Row className="mb-2 mb-3">
                <h2 className="text-center">{title}</h2>
              </Row>
            )}

            {orderUser && (
              <Row className="mb-2 mt-5 mb-3">
                <h3 className="text-start">
                  {t("common.user")}: {orderUser.user_name}
                </h3>
              </Row>
            )}

            <BuyTable
              dataLines={items}
              orderSummary={true}
              recommendation={false}
            />
          </Row>

          <Row className="mt-4 text-start">
            {items && (
              <h2>
                {t("common.order_summary")}: € {totalCost}
              </h2>
            )}
          </Row>
          {button && <>{button}</>}
        </>
      ) : (
        <Col className="text-center">{t("common.no_orders")}</Col>
      )}
    </Row>
  );
}

export default OrderSummaryComponent;
