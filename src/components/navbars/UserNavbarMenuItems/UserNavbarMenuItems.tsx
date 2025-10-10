"use client";
import React from "react";

import Link from "next/link";

import { ExpandedNavContext } from "../Header/Header";

type UserNavbarMenuItemsProps = {
  first_name: string;
};

function UserNavbarMenuItems({ first_name }: UserNavbarMenuItemsProps) {
  const { closeExpandedNav } = React.useContext(ExpandedNavContext);

  return (
    <>
      <Link
        className="nav-link"
        href="/user"
        onClick={closeExpandedNav}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        {first_name}
      </Link>
    </>
  );
}

export default UserNavbarMenuItems;
