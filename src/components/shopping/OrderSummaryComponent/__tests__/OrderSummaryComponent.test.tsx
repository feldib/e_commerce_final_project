import React from "react";
import { render, screen } from "@testing-library/react";

import OrderSummaryComponent from "../OrderSummaryComponent";

// Mock dependencies
jest.mock("@/components/providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/components/tables/buy/BuyTable/BuyTable", () => {
  return function MockBuyTable() {
    return <div data-testid="buy-table">BuyTable</div>;
  };
});

const mockArtworks = [
  {
    id: 1,
    title: "Test Artwork 1",
    artist_name: "Artist 1",
    price: 100,
    quantity: 1,
    category_id: 1,
    date_added: "2023-01-01",
    stored_amount: 10,
  },
  {
    id: 2,
    title: "Test Artwork 2",
    artist_name: "Artist 2",
    price: 200,
    quantity: 2,
    category_id: 2,
    date_added: "2023-01-01",
    stored_amount: 5,
  },
];

describe("OrderSummaryComponent", () => {
  const defaultProps = {
    items: mockArtworks,
    totalCost: 300,
  };

  it("should render without crashing", () => {
    render(<OrderSummaryComponent {...defaultProps} />);
    expect(document.body).toBeTruthy();
  });

  it("should render buy table when items exist", () => {
    render(<OrderSummaryComponent {...defaultProps} />);
    expect(screen.getByTestId("buy-table")).toBeTruthy();
  });

  it("should render total cost", () => {
    render(<OrderSummaryComponent {...defaultProps} />);
    expect(screen.getByText(/common.shop.order_summary/)).toBeTruthy();
    expect(screen.getByText(/€ 300/)).toBeTruthy();
  });

  it("should render title when provided", () => {
    render(
      <OrderSummaryComponent {...defaultProps} title="Order Summary Title" />
    );
    expect(screen.getByText("Order Summary Title")).toBeTruthy();
  });

  it("should render order user when provided", () => {
    const orderUser = { user_name: "John Doe", user_id: 1 };

    render(<OrderSummaryComponent {...defaultProps} orderUser={orderUser} />);

    expect(screen.getByText(/common.fields.user/)).toBeTruthy();
    expect(screen.getByText(/John Doe/)).toBeTruthy();
  });

  it("should render custom button when provided", () => {
    const customButton = (
      <button data-testid="custom-button">Custom Button</button>
    );

    render(<OrderSummaryComponent {...defaultProps} button={customButton} />);

    expect(screen.getByTestId("custom-button")).toBeTruthy();
  });

  it("should show no orders message when items array is empty", () => {
    render(<OrderSummaryComponent items={[]} totalCost={0} />);

    expect(screen.getByText("common.no_result.no_orders")).toBeTruthy();
    expect(screen.queryByTestId("buy-table")).toBeFalsy();
  });

  it("should render floating element container", () => {
    const { container } = render(<OrderSummaryComponent {...defaultProps} />);

    const floatingElement = container.querySelector(".floating-element");
    expect(floatingElement).toBeTruthy();
  });

  it("should handle different total cost values", () => {
    render(<OrderSummaryComponent items={mockArtworks} totalCost={999.99} />);

    expect(screen.getByText(/€ 999.99/)).toBeTruthy();
  });
});
