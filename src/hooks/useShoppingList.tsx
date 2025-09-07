"use client";
import React from "react";
import { server_url } from "../utils/api_constants";
import { getLocatStorageShoppingCart } from "../helpers/helpers";
import axiosConfigured from "@/utils/axiosConfigured";

const useShoppingList = (loggedIn: boolean) => {
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    (async () => {
      if (loggedIn) {
        await axiosConfigured
          .get(`${server_url}/users/shopping_cart`)
          .then(function (results) {
            setData(results.data as any[]);
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
