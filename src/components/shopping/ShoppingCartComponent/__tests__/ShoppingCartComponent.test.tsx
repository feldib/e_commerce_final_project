import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import ShoppingCartComponent from "../ShoppingCartComponent";
import * as useShoppingCartComponentModule from "../useShoppingCartComponent";

// Mock the useShoppingCartComponent hook
jest.mock("../useShoppingCartComponent", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the ShoppingCartTable component
jest.mock(
  "@/components/tables/shopping_cart/ShoppingCartTable/ShoppingCartTable",
  () => {
    return function MockShoppingCartTable({
      dataLines,
    }: {
      dataLines: unknown[];
    }) {
      return (
        <div data-testid="shopping-cart-table">
          {dataLines.length} items in cart
        </div>
      );
    };
  }
);

const mockUseShoppingCartComponent =
  useShoppingCartComponentModule.default as jest.MockedFunction<
    typeof useShoppingCartComponentModule.default
  >;

const mockUserDataContext = {
  loggedIn: true,
  user: {
    id: 1,
    first_name: "Test",
    last_name: "User",
    email: "test@test.com",
    address: "Test Address",
    phone_number: "123456789",
    is_admin: false,
  },
  logOut: jest.fn(),
  settleSuccessfulLogIn: jest.fn(),
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>
    <UserDataContext.Provider value={mockUserDataContext}>
      {children}
    </UserDataContext.Provider>
  </I18nProvider>
);

describe("ShoppingCartComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render empty cart message when no items", () => {
    mockUseShoppingCartComponent.mockReturnValue({
      loggedIn: true,
      shoppingListItems: [],
      totalCost: 0,
      handleCostsChange: jest.fn(),
      handleCheckoutClick: jest.fn(),
      t: (key: string) => key,
    });

    render(
      <TestWrapper>
        <ShoppingCartComponent />
      </TestWrapper>
    );

    expect(
      screen.getByText("components.shopping_cart.shopping_cart_empty")
    ).toBeTruthy();
  });

  it("should render shopping cart with items", () => {
    const mockItems = [
      {
        id: 1,
        title: "Test Item 1",
        artist_name: "Test Artist 1",
        price: 10.99,
        quantity: 2,
        category_id: 1,
        date_added: "2023-01-01",
        stored_amount: 5,
      },
      {
        id: 2,
        title: "Test Item 2",
        artist_name: "Test Artist 2",
        price: 15.5,
        quantity: 1,
        category_id: 2,
        date_added: "2023-01-02",
        stored_amount: 3,
      },
    ];

    mockUseShoppingCartComponent.mockReturnValue({
      loggedIn: true,
      shoppingListItems: mockItems,
      totalCost: 37.48,
      handleCostsChange: jest.fn(),
      handleCheckoutClick: jest.fn(),
      t: (key: string) => key,
    });

    render(
      <TestWrapper>
        <ShoppingCartComponent />
      </TestWrapper>
    );

    expect(screen.getByTestId("shopping-cart-table")).toBeTruthy();
    expect(screen.getByText("2 items in cart")).toBeTruthy();
    expect(screen.getByText("common.shop.order_summary: € 37.48")).toBeTruthy();
    expect(screen.getByText("common.actions.checkout")).toBeTruthy();
  });

  it("should show login link when user is not logged in", () => {
    const mockItems = [
      {
        id: 1,
        title: "Test Item 1",
        artist_name: "Test Artist 1",
        price: 10.99,
        quantity: 1,
        category_id: 1,
        date_added: "2023-01-01",
        stored_amount: 5,
      },
    ];

    mockUseShoppingCartComponent.mockReturnValue({
      loggedIn: false,
      shoppingListItems: mockItems,
      totalCost: 10.99,
      handleCostsChange: jest.fn(),
      handleCheckoutClick: jest.fn(),
      t: (key: string) => key,
    });

    render(
      <TestWrapper>
        <ShoppingCartComponent />
      </TestWrapper>
    );

    const checkoutLink = screen.getByRole("link");
    expect(checkoutLink.getAttribute("href")).toBe("/login");
  });

  it("should show checkout link when user is logged in", () => {
    const mockItems = [
      {
        id: 1,
        title: "Test Item 1",
        artist_name: "Test Artist 1",
        price: 10.99,
        quantity: 1,
        category_id: 1,
        date_added: "2023-01-01",
        stored_amount: 5,
      },
    ];

    mockUseShoppingCartComponent.mockReturnValue({
      loggedIn: true,
      shoppingListItems: mockItems,
      totalCost: 10.99,
      handleCostsChange: jest.fn(),
      handleCheckoutClick: jest.fn(),
      t: (key: string) => key,
    });

    render(
      <TestWrapper>
        <ShoppingCartComponent />
      </TestWrapper>
    );

    const checkoutLink = screen.getByRole("link");
    expect(checkoutLink.getAttribute("href")).toBe("/checkout");
  });

  it("should call handleCheckoutClick when checkout button is clicked", () => {
    const mockHandleCheckoutClick = jest.fn();
    const mockItems = [
      {
        id: 1,
        title: "Test Item 1",
        artist_name: "Test Artist 1",
        price: 10.99,
        quantity: 1,
        category_id: 1,
        date_added: "2023-01-01",
        stored_amount: 5,
      },
    ];

    mockUseShoppingCartComponent.mockReturnValue({
      loggedIn: true,
      shoppingListItems: mockItems,
      totalCost: 10.99,
      handleCostsChange: jest.fn(),
      handleCheckoutClick: mockHandleCheckoutClick,
      t: (key: string) => key,
    });

    render(
      <TestWrapper>
        <ShoppingCartComponent />
      </TestWrapper>
    );

    const checkoutButton = screen.getByText("common.actions.checkout");
    fireEvent.click(checkoutButton);

    expect(mockHandleCheckoutClick).toHaveBeenCalledTimes(1);
  });
});
