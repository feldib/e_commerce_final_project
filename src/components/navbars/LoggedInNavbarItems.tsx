"use client";
import React from "react";
import UserNavbarMenuItems from "./UserNavbarMenuItems";
import { serverLogOut } from "@/fetching/fetching";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import { ExpandedNavContext } from "./Header";
import { useRouter } from "next/navigation";

function LoggedInNavbarItems() {
  const { user, logOut: contextLogOut } = React.useContext(UserDataContext);
  const { closeExpandedNav } = React.useContext(ExpandedNavContext);
  const router = useRouter();

  return (
    <>
      {user && !user.is_admin ? (
        <UserNavbarMenuItems first_name={user.first_name} />
      ) : (
        <Link
          onClick={closeExpandedNav}
          className="nav-link"
          style={{ color: "inherit", textDecoration: "inherit" }}
          href="/admin"
        >
          Admin Page
        </Link>
      )}

      <Nav.Link
        onClick={async () => {
          closeExpandedNav();
          await serverLogOut();
          contextLogOut();
          router.push("/");
        }}
      >
        Log out
      </Nav.Link>
    </>
  );
}

export default LoggedInNavbarItems;
