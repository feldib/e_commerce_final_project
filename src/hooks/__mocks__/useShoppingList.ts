/**
 * Mock for useShoppingList hook
 */

const useShoppingList = jest.fn(() => ({
  shoppingList: [],
  addToShoppingList: jest.fn(),
  removeFromShoppingList: jest.fn(),
  updateQuantity: jest.fn(),
  clearShoppingList: jest.fn(),
  total: 0,
  itemCount: 0,
}));

export default useShoppingList;
