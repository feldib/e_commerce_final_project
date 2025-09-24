"use client";
import React from "react";

import { UserDataContext } from "./UserDataProvider";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, loggedIn } = React.useContext(UserDataContext);

  React.useEffect(() => {
    // Apply admin theme class to body when user is admin
    if (loggedIn && user.is_admin) {
      document.body.classList.add("admin-theme");
    } else {
      document.body.classList.remove("admin-theme");
    }

    // Cleanup function to remove theme class
    return () => {
      document.body.classList.remove("admin-theme");
    };
  }, [loggedIn, user.is_admin]);

  return <>{children}</>;
}

export default ThemeProvider;
