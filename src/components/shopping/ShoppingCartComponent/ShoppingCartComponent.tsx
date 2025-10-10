"use client";
import React from "react";

import Link from "next/link";

import { Button, Col, Row } from "react-bootstrap";

import ShoppingCartTable from "@/components/tables/shopping_cart/ShoppingCartTable/ShoppingCartTable";

import useShoppingCartComponent from "./useShoppingCartComponent";

function ShoppingCartComponent() {
  const {
    loggedIn,
    shoppingListItems,
    totalCost,
    handleCostsChange,
    handleCheckoutClick,
    t,
  } = useShoppingCartComponent();

  return (
    <Row className="px-3 mx-auto floating-element mb-5">
      {shoppingListItems.length !== 0 ? (
        <>
          <ShoppingCartTable
            changeCosts={handleCostsChange}
            dataLines={shoppingListItems}
          />

          <Row className="mt-4">
            {shoppingListItems && (
              <h2>
                {t("common.shop.order_summary")}: € {totalCost}
              </h2>
            )}
          </Row>

          <Row>
            {shoppingListItems.length !== 0 && (
              <Col className="text-center mb-5">
                <Link href={loggedIn ? "/checkout" : "/login"}>
                  <Button className="submit" onClick={handleCheckoutClick}>
                    {t("common.actions.checkout")}
                  </Button>
                </Link>
              </Col>
            )}
          </Row>
        </>
      ) : (
        <Col className="text-center">
          {t("components.shopping_cart.shopping_cart_empty")}
        </Col>
      )}
    </Row>
  );
}

export default ShoppingCartComponent;
