"use client";
import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Nav } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { serverLogOut } from "@/fetching/fetching";

import { ExpandedNavContext } from "./Header";
import UserNavbarMenuItems from "./UserNavbarMenuItems";

function LoggedInNavbarItems() {
  const { user, logOut: contextLogOut } = React.useContext(UserDataContext);
  const { closeExpandedNav } = React.useContext(ExpandedNavContext);
  const { t } = useI18n();
  const router = useRouter();

  return (
    <>
      {user && !user.is_admin ? (
        <UserNavbarMenuItems first_name={user.first_name} />
      ) : (
        <Link
          className="nav-link"
          href="/admin"
          onClick={closeExpandedNav}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          {t("navigation.admin_page")}
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
        {t("navigation.log_out")}
      </Nav.Link>
    </>
  );
}

export default LoggedInNavbarItems;
