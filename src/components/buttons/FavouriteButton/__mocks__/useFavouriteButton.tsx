/**
 * Mock for useFavouriteButton hook
 */

import React from "react";

const useFavouriteButton = jest.fn(() => ({
  addToAdded: jest.fn(),
  artwork_id: 123,
  filledButton: <span>Filled</span>,
  isAdded: jest.fn().mockResolvedValue(false),
  regularButton: <span>Regular</span>,
  removeFromAdded: jest.fn(),
  toastWarningMessage: "Please sign in to add to wishlist",
}));

export default useFavouriteButton;
