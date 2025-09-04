"use client"
import React, { JSX } from "react";
import { getLoggedIn } from "@/fetching/fetching";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getShoppingCartFromLocalStorage, replacePreviousShoppingCart } from "@/helpers/helpers";
import { confirmAlert } from "react-confirm-alert";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type UserDataContextType = {
  user: {
    id: number;
    email: string;
    user_name: string;
    is_admin: boolean;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
  },
  loggedIn: boolean;
  settleSuccessfulLogIn: (to_checkout: boolean, userData: any, router: AppRouterInstance) => void;
};

const initialValues: UserDataContextType = {
  user: {
    id: 0,
    email: "",
    user_name: "",
    is_admin: false,
    first_name: "",
    last_name: "",
    address:  "",
    phone_number: "",
  },
  loggedIn: false,
  settleSuccessfulLogIn: () => {},
};

export const UserDataContext = React.createContext<UserDataContextType>(initialValues);

export default function UserDataProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = React.useState<UserDataContextType["user"]>(initialValues.user);
  const [loggedIn, setLoggedIn] = React.useState(initialValues.loggedIn);

  const getUserData = () => {
    getLoggedIn()
      .then((res) => {
        const data = res.data as { user: UserDataContextType["user"] };
        setUser(data.user);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const settleSuccessfulLogIn = (to_checkout: boolean, userData: any, router: AppRouterInstance) => {
  const checkout_path = "/checkout";
  const user_path = userData.is_admin ? "/admin" : "/user";
  const path = to_checkout ? checkout_path : user_path;

  const signed_out_shopping_cart = getShoppingCartFromLocalStorage();

  setUser(userData);

  if (signed_out_shopping_cart) {
    confirmAlert({
      title: "Replace shopping cart",
      message:
        "Do you want to replace your current shopping cart with this one?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            replacePreviousShoppingCart();
            router.push(path);
          },
        },
        {
          label: "No",
          onClick: () => {
            localStorage.removeItem("shopping_cart");
            router.push(user_path);
          },
        },
      ],
    });
  } else {
    router.push(path);
  }
};

  React.useEffect(() => {
    getUserData();
  }, []);

  return React.createElement(
    UserDataContext.Provider,
    { value: { user, loggedIn, settleSuccessfulLogIn } },
    children,
  );
}
