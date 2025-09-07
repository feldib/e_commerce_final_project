"use client";
import React from "react";
import { getLocatStorageShoppingCart } from "../helpers/helpers";
import { getShoppingCart } from "@/fetching/fetching";

const useShoppingList = (loggedIn: boolean) => {
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    (async () => {
      if (loggedIn) {
        await getShoppingCart()
          .then((results) => {
            setData(results);
          })
          .catch(function (error) {
            setData([]);
            console.log(error);
          });
      } else {
        await getLocatStorageShoppingCart()
          .then((artworks_in_shopping_cart) => {
            setData(artworks_in_shopping_cart);
          })
          .catch(function (error) {
            setData([]);
          });
      }
    })();
  }, [loggedIn]);
  return data;
};

export default useShoppingList;
