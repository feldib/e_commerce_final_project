"use client";
import React from "react";
import { Container, Row } from "react-bootstrap";
import SubNavbar from "../../components/navbars/SubNavbar";
import {
  faMessage,
  faStar,
  faPerson,
  faPalette,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../../components/PageTitle";
import {
  redirectIfNotloggedIn,
  redirectIfNotAdmin,
} from "../../helpers/helpers";
import { useRouter } from "next/navigation";

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
