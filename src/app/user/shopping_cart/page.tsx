"use client";
import React from "react";

import { Col } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";
import ShoppingCartComponent from "@/components/ShoppingCartComponent";
import SubPageTitle from "@/components/SubPageTitle";

function ShoppingCartSubPage() {
  const { t } = useI18n();
  return (
    <Col className="mb-5 pb-5">
      <SubPageTitle title={t("app.shopping_cart.title")} />
      <ShoppingCartComponent />
    </Col>
  );
}

export default ShoppingCartSubPage;
