"use client";
import React from "react";
import Link from "next/link";
import { ExpandedNavContext } from "./Header";

type UserNavbarMenuItemsProps = {
  item: string;
};

function UserNavbarMenuItems({ item }: UserNavbarMenuItemsProps) {
  const { closeExpandedNav } = React.useContext(ExpandedNavContext);

  return (
    <>
      <Link
        href="/user"
        onClick={closeExpandedNav}
        className="nav-link"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        {item}
      </Link>
    </>
  );
}

export default UserNavbarMenuItems;
