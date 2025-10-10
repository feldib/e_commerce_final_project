/**
 * Mock for useCategories hook
 */

const useCategories = jest.fn(() => ({
  categories: [],
  loading: false,
  error: null,
  refetch: jest.fn(),
}));

export default useCategories;
