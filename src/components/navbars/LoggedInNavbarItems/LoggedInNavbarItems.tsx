"use client";
import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Nav } from "react-bootstrap";

import { authToast } from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider/UserDataProvider";

import { serverLogOut } from "@/fetching/auth";

import { ExpandedNavContext } from "../Header/Header";
import UserNavbarMenuItems from "../UserNavbarMenuItems/UserNavbarMenuItems";

function LoggedInNavbarItems() {
  const { user, logOut: contextLogOut } = React.useContext(UserDataContext);
  const { closeExpandedNav } = React.useContext(ExpandedNavContext);
  const { t } = useI18n();
  const router = useRouter();

  const handleLogoutClick = async () => {
    closeExpandedNav();
    await serverLogOut().then(() => {
      authToast.logout.success(t);
    });
    contextLogOut();
    router.push("/");
  };

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

      <Nav.Link onClick={handleLogoutClick}>{t("navigation.log_out")}</Nav.Link>
    </>
  );
}

export default LoggedInNavbarItems;
