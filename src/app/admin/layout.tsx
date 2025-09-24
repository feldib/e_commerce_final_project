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

import { redirectIfNotAdmin,redirectIfNotloggedIn } from "@/helpers/helpers";

function AdminPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  redirectIfNotloggedIn(router);
  redirectIfNotAdmin(router);

  return (
    <Container className="pb-5">
      <PageTitle title="Admin page" />

      <SubNavbar
        linkObjects={[
          { linkText: "Artworks", linkTo: "artworks", icon: faPalette },
          { linkText: "Users", linkTo: "users", icon: faPerson },
          { linkText: "Orders", linkTo: "orders", icon: faClockRotateLeft },
          { linkText: "Reviews", linkTo: "reviews", icon: faStar },
          { linkText: "Messages", linkTo: "messages", icon: faMessage },
        ]}
      />

      <Row id="subpage" className="pb-5">
        {children}
      </Row>
    </Container>
  );
}

export default AdminPage;
