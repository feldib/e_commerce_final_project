import {
  getDataOfArtworks,
  replaceSavedShoppingCart,
  getLoggedIn,
  getIsAdmin,
} from "@/fetching/fetching";

import axios from "axios";

import { server_url } from "../utils/api_constants";
import React from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

axios.defaults.withCredentials = true;

const presentData = (
  dataLines: any[],
  makeDataLines: (dataLines: any[]) => React.JSX.Element
) : React.JSX.Element=> {
  if (dataLines.length > 0) {
    return makeDataLines(dataLines);
  } else {
    return (
      <tr>
        <td colSpan={8}>
          <h6 className="text-center">No results</h6>
        </td>
      </tr>
    );
  }
};

const increaseLocalStorageShoppingCartQuantity = (
  artwork_id: number,
  stored_amount: number,
) => {
  const shoppingCart = getShoppingCartFromLocalStorage();

  const existingRecordIndex = shoppingCart.findIndex(
    (item: { artwork_id: number; quantity: number }) => item.artwork_id === artwork_id,
  );

  if (stored_amount > 0) {
    if (existingRecordIndex < 0) {
      shoppingCart.push({
        artwork_id: artwork_id,
        quantity: 1,
      });
      localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
    } else if (shoppingCart[existingRecordIndex].quantity > 0) {
      shoppingCart[existingRecordIndex].quantity++;
      localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
    } else {
      throw new Error("Item is out of stock");
    }
  } else {
    throw new Error("Item is out of stock");
  }
};

const decreaseLocalStorageShoppingCartQuantity = (artwork_id: number) => {
  const shoppingCart = getShoppingCartFromLocalStorage();
  const existingRecordIndex = shoppingCart.findIndex(
    (item: { artwork_id: number; quantity: number }) => item.artwork_id === artwork_id,
  );

  if (
    existingRecordIndex >= 0 &&
    shoppingCart[existingRecordIndex].quantity > 0
  ) {
    if (shoppingCart[existingRecordIndex].quantity === 1) {
      shoppingCart.splice(existingRecordIndex, 1);
    } else {
      shoppingCart[existingRecordIndex].quantity--;
    }

    localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
  }
};

const removeLocalStorageShoppingCartQuantity = (artwork_id: number) => {
  const shoppingCart = getShoppingCartFromLocalStorage();

  const existingRecordIndex = shoppingCart.findIndex(
    (item: { artwork_id: number; quantity: number }) => item.artwork_id === artwork_id,
  );

  if (
    existingRecordIndex >= 0 &&
    shoppingCart[existingRecordIndex].quantity > 0
  ) {
    shoppingCart.splice(existingRecordIndex, 1);
    localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
  }
};

const getLocatStorageShoppingCart = async () => {
  let shoppingCart = getShoppingCartFromLocalStorage();
  if (!shoppingCart) {
    return [];
  } else {
    const data = await getDataOfArtworks(shoppingCart);
    return data;
  }
};

const replacePreviousShoppingCart = async () => {
  const shopping_cart = getShoppingCartFromLocalStorage();
  replaceSavedShoppingCart(shopping_cart);
  localStorage.removeItem("shopping_cart");
};

const redirectIfNotloggedIn = (router: AppRouterInstance) => {
  getLoggedIn().catch(() => {
    router.push("/login");
  });
};

const redirectIfNotAdmin = (router: AppRouterInstance) => {
  redirectIfNotloggedIn(router);
  getIsAdmin().catch(() => {
    router.push("/user");
  });
};

const checkIfShoppingCartIsEmpty = async (loggedIn: boolean) => {
  if (loggedIn) {
    return axios
      .get(`${server_url}/users/shopping_cart`)
      .then(function (results) {
        if (Array.isArray(results.data) && results.data.length) {
          return true;
        } else {
          return false;
        }
      })
      .catch(function (error) {
        return false;
      });
  } else {
    return getLocatStorageShoppingCart()
      .then((artworks_in_shopping_cart) => {
        if (artworks_in_shopping_cart.length) {
          return true;
        } else {
          return false;
        }
      })
      .catch(function (error) {
        return false;
      });
  }
};

// Returns the shopping cart array from localStorage, or an empty array if not present or invalid
function getShoppingCartFromLocalStorage() {
    const shoppingCartString = localStorage.getItem("shopping_cart");
    try {
        return shoppingCartString ? JSON.parse(shoppingCartString) : [];
    } catch {
        return [];
    }
}

export {
  presentData,
  increaseLocalStorageShoppingCartQuantity,
  decreaseLocalStorageShoppingCartQuantity,
  removeLocalStorageShoppingCartQuantity,
  getLocatStorageShoppingCart,
  replacePreviousShoppingCart,
  redirectIfNotloggedIn,
  redirectIfNotAdmin,
  checkIfShoppingCartIsEmpty,
  getShoppingCartFromLocalStorage,
};
