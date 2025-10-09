"use client";
import React from "react";

import { Container } from "react-bootstrap";

import PageTitle from "@/components/layout/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";
import ShoppingCartComponent from "@/components/shopping/ShoppingCartComponent";

function ShoppingCartPage() {
  const { t } = useI18n();

  return (
    <Container className="pb-5 mb-5">
      <PageTitle title={t("common.shop.shopping_cart")} />
      <ShoppingCartComponent />
    </Container>
  );
}

export default ShoppingCartPage;
