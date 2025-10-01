"use client";
import React from "react";

import Link from "next/link";

import { Button, Col, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import ShoppingCartTable from "@/components/tables/ShoppingCartTable";

import useShoppingList from "@/hooks/useShoppingList";

function ShoppingCartComponent() {
  const { t } = useI18n();
  const { loggedIn } = React.useContext(UserDataContext);

  const shoppingListItems = useShoppingList(loggedIn);

  const [costs, setCosts] = React.useState<{ [key: number]: number }>({});

  const [totalCost, setTotalCost] = React.useState(0);

  return (
    <Row className="px-3 mx-auto floating-element mb-5">
      {shoppingListItems.length !== 0 ? (
        <>
          <ShoppingCartTable
            theadNeeded={true}
            dataLines={shoppingListItems}
            changeCosts={(key, newCost) => {
              const temp = costs;

              temp[key] = newCost;

              setCosts(temp);

              setTotalCost(
                Object.values(costs).reduce((acc, curr) => acc + curr, 0),
              );
            }}
          />

          <Row className="mt-4">
            {shoppingListItems && (
              <h2>
                {t("common.order_summary")}: € {totalCost}
              </h2>
            )}
          </Row>

          <Row>
            {shoppingListItems.length !== 0 && (
              <Col className="text-center mb-5">
                <Link href={loggedIn ? "/checkout" : "/login"}>
                  <Button
                    className="submit"
                    onClick={() => {
                      localStorage.removeItem("currentOrder");
                      localStorage.setItem(
                        "currentOrder",
                        JSON.stringify({ items: shoppingListItems, totalCost }),
                      );
                    }}
                  >
                    {t("common.checkout")}
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
