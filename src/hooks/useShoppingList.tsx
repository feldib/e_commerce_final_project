"use client";
import React from "react";
import { getLocalStorageShoppingCart } from "@/helpers/helpers";
import { getShoppingCart } from "@/fetching/fetching";
import { Artwork } from "@/fetching/types";

const useShoppingList = (loggedIn: boolean) => {
  const [data, setData] = React.useState<Artwork[]>([]);
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
        await getLocalStorageShoppingCart()
          .then((artworks_in_shopping_cart) => {
            setData(artworks_in_shopping_cart);
          })
          .catch(function () {
            setData([]);
          });
      }
    })();
  }, [loggedIn]);
  return data;
};

export default useShoppingList;
