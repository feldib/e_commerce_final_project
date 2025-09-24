"use client";
import React from "react";

import { useRouter } from "next/navigation";

import {
  faClockRotateLeft,
  faHeart,
  faInfoCircle,
  faShoppingCart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row } from "react-bootstrap";

import SubNavbar from "@/components/navbars/SubNavbar";
import PageTitle from "@/components/PageTitle";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { redirectIfNotloggedIn } from "@/helpers/helpers";
import useLoading from "@/hooks/useLoading";

function ProfilePage({ children }: React.PropsWithChildren<React.ReactNode>) {
  const { user } = React.useContext(UserDataContext);
  const router = useRouter();
  redirectIfNotloggedIn(router);

  const title = useLoading(user.first_name, (first_name) => {
    return <PageTitle title={`${first_name}'s page`} />;
  });

  return (
    <Container>
      {title}

      <SubNavbar
        linkObjects={[
          { linkText: "User Data", linkTo: "data", icon: faInfoCircle },
          {
            linkText: "Order History",
            linkTo: "order_history",
            icon: faClockRotateLeft,
          },
          { linkText: "Wishlist", linkTo: "wishlist", icon: faHeart },
          { linkText: "Reviews", linkTo: "reviews", icon: faStar },
          {
            linkText: "Shopping Cart",
            linkTo: "shopping_cart",
            icon: faShoppingCart,
          },
        ]}
      />

      <Row id="subpage" className="pb-5">
        {children}
      </Row>
    </Container>
  );
}

export default ProfilePage;
