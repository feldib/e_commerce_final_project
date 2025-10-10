"use client";
import React from "react";

import { UserDataContext } from "../UserDataProvider/UserDataProvider";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, loggedIn } = React.useContext(UserDataContext);

  React.useEffect(() => {
    const shouldHaveAdminTheme = loggedIn && user.is_admin;

    if (shouldHaveAdminTheme) {
      localStorage.setItem("admin-theme", "true");
      document.body.classList.add("admin-theme");
    } else {
      localStorage.removeItem("admin-theme");
      document.body.classList.remove("admin-theme");
    }
  }, [loggedIn, user.is_admin]);

  React.useEffect(() => {
    const hasAdminTheme = localStorage.getItem("admin-theme") === "true";
    if (hasAdminTheme) {
      document.body.classList.add("admin-theme");
    }
  }, []);

  return <>{children}</>;
}

export default ThemeProvider;
