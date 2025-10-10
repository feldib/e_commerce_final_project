/**
 * Mock for useFavouriteButton hook
 */

const useFavouriteButton = jest.fn(() => ({
  handleAddOrRemoveFromWishList: jest.fn(),
  isOnWishList: false,
}));

export default useFavouriteButton;
