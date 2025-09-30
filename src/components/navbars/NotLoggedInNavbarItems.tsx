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
        onClick={closeExpandedNav}
        className="nav-link"
        style={{ color: "inherit", textDecoration: "inherit" }}
        href="/login"
      >
        {t("navigation.log_in")}
      </Link>

      <Link
        onClick={closeExpandedNav}
        className="nav-link"
        style={{ color: "inherit", textDecoration: "inherit" }}
        href="/register"
      >
        {t("common.register")}
      </Link>
    </>
  );
}

export default NotLoggedInNavbarItems;
