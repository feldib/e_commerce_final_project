"use client";
import React from "react";
import Link from "next/link";
import { ExpandedNavContext } from "./Header";

type UserNavbarMenuItemsProps = {
  first_name: string;
};

function UserNavbarMenuItems(props: UserNavbarMenuItemsProps) {
  const { closeExpandedNav } = React.useContext(ExpandedNavContext);

  return (
    <>
      <Link
        href="/user"
        onClick={closeExpandedNav}
        className="nav-link"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        {props.first_name}
      </Link>
    </>
  );
}

export default UserNavbarMenuItems;
