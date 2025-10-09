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

import PageTitle from "@/components/layout/PageTitle";
import SubNavbar from "@/components/navbars/SubNavbar";
import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { redirectIfNotloggedIn } from "@/helpers/authHelpers";
import useLoading from "@/hooks/useLoading";

function ProfilePage({ children }: React.PropsWithChildren<React.ReactNode>) {
  const { user } = React.useContext(UserDataContext);
  const { t } = useI18n();
  const router = useRouter();
  redirectIfNotloggedIn(router);

  const title = useLoading(user.first_name, (first_name) => {
    return <PageTitle title={`${first_name}'s page`} />;
  });

  const links = [
    {
      linkText: t("app.user.layout.user_data"),
      linkTo: "data",
      icon: faInfoCircle,
    },
    {
      linkText: t("app.user.layout.order_history"),
      linkTo: "order_history",
      icon: faClockRotateLeft,
    },
    {
      linkText: t("app.user.layout.wishlist"),
      linkTo: "wishlist",
      icon: faHeart,
    },
    {
      linkText: t("app.user.layout.reviews"),
      linkTo: "reviews",
      icon: faStar,
    },
    {
      linkText: t("app.user.layout.shopping_cart"),
      linkTo: "shopping_cart",
      icon: faShoppingCart,
    },
  ];

  return (
    <Container>
      {title}

      <SubNavbar linkObjects={links} />

      <Row className="pb-5" id="subpage">
        {children}
      </Row>
    </Container>
  );
}

export default ProfilePage;
