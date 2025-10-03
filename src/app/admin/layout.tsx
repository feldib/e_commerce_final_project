"use client";
import React from "react";

import { useRouter } from "next/navigation";

import {
  faClockRotateLeft,
  faMessage,
  faPalette,
  faPerson,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row } from "react-bootstrap";

import SubNavbar from "@/components/navbars/SubNavbar";
import PageTitle from "@/components/PageTitle";
import { useI18n } from "@/components/providers/I18nProvider";

import {
  redirectIfNotAdmin,
  redirectIfNotloggedIn,
} from "@/helpers/authHelpers";

function AdminPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { t } = useI18n();

  redirectIfNotloggedIn(router);
  redirectIfNotAdmin(router);

  return (
    <Container className="pb-5">
      <PageTitle title={t("app.admin.layout.title")} />

      <SubNavbar
        linkObjects={[
          {
            linkText: t("app.admin.layout.artworks"),
            linkTo: "artworks",
            icon: faPalette,
          },
          {
            linkText: t("app.admin.layout.users"),
            linkTo: "users",
            icon: faPerson,
          },
          {
            linkText: t("app.admin.layout.orders"),
            linkTo: "orders",
            icon: faClockRotateLeft,
          },
          {
            linkText: t("app.admin.layout.reviews"),
            linkTo: "reviews",
            icon: faStar,
          },
          {
            linkText: t("app.admin.layout.messages"),
            linkTo: "messages",
            icon: faMessage,
          },
        ]}
      />

      <Row id="subpage" className="pb-5">
        {children}
      </Row>
    </Container>
  );
}

export default AdminPage;
