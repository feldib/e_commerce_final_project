"use client"
import React from "react";
import Link from "next/link";
import { ExpandedNavContext } from "./Header";

function NotLoggedInNavbarItems() {
  const { closeExpandedNav } = React.useContext(ExpandedNavContext);

  return (
    <>
      <Link
        onClick={closeExpandedNav}
        className="nav-link"
        style={{ color: "inherit", textDecoration: "inherit" }}
        href="/login"
      >
        Log in
      </Link>

      <Link
        onClick={closeExpandedNav}
        className="nav-link"
        style={{ color: "inherit", textDecoration: "inherit" }}
        href="/register"
      >
        Register
      </Link>
    </>
  );
}

export default NotLoggedInNavbarItems;
