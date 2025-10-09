"use client";
import React from "react";

import Link from "next/link";

import { useI18n } from "@/components/providers/I18nProvider";

import { ExpandedNavContext } from "./Header";

function NotLoggedInNavbarItems() {
  const { closeExpandedNav } = React.useContext(ExpandedNavContext);
  const { t } = useI18n();

  return (
    <>
      <Link
        className="nav-link"
        href="/login"
        onClick={closeExpandedNav}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        {t("navigation.log_in")}
      </Link>

      <Link
        className="nav-link"
        href="/register"
        onClick={closeExpandedNav}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        {t("common.actions.register")}
      </Link>
    </>
  );
}

export default NotLoggedInNavbarItems;
