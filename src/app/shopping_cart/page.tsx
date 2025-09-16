"use client";
import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import ShoppingCartTable from "@/components/tables/ShoppingCartTable";
import useShoppingList from "@/hooks/useShoppingList";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { UserDataContext } from "@/components/providers/UserDataProvider";

function ShoppingCartPage() {
  const { loggedIn } = React.useContext(UserDataContext);

  const shoppingListItems = useShoppingList(loggedIn);

  const [costs, setCosts] = React.useState<{ [key: number]: number }>({});

  const [totalCost, setTotalCost] = React.useState(0);

  return (
    <Container className="pb-5 mb-5">
      <PageTitle title="Shopping cart" />

      <Row className="px-3 mx-auto floating-element mb-5">
        <ShoppingCartTable
          theadNeeded={true}
          dataLines={shoppingListItems}
          changeCosts={(key, newCost) => {
            const temp = costs;

            temp[key] = newCost;

            setCosts(temp);

            setTotalCost(
              Object.values(costs).reduce((acc, curr) => acc + curr, 0)
            );
          }}
        />

        <Row className="mt-4">
          {shoppingListItems && <h2>Order Summary: € {totalCost}</h2>}
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
                      JSON.stringify({ items: shoppingListItems, totalCost })
                    );
                  }}
                >
                  Go to Checkout
                </Button>
              </Link>
            </Col>
          )}
        </Row>
      </Row>
    </Container>
  );
}

export default ShoppingCartPage;
