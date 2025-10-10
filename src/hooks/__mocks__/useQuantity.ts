/**
 * Mock for useQuantity hook
 */

const useQuantity = jest.fn(() => ({
  quantity: 1,
  increment: jest.fn(),
  decrement: jest.fn(),
  setQuantity: jest.fn(),
  reset: jest.fn(),
}));

export default useQuantity;
