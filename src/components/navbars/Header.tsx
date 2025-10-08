"use client";
import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar } from "react-bootstrap";

import { UI_DIMENSIONS } from "@/utils/constants";
import { showCartEmptyWarningToast } from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import LanguageSelector from "./LanguageSelector";
import LoggedInNavbarItems from "./LoggedInNavbarItems";
import NotLoggedInNavbarItems from "./NotLoggedInNavbarItems";

import { checkIfShoppingCartIsEmpty } from "@/helpers/shoppingCartHelpers";

export const ExpandedNavContext = React.createContext({
  closeExpandedNav: () => {},
});

function Header() {
  const router = useRouter();
  const { t } = useI18n();

  const { user, loggedIn } = React.useContext(UserDataContext);

  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const closeExpandedNav = () => {
    setExpanded(false);
  };

  const handleShoppingCartClick = async () => {
    const isShoppingCartEmpty = await checkIfShoppingCartIsEmpty(loggedIn);

    if (!isShoppingCartEmpty) {
      showCartEmptyWarningToast(t);
    } else {
      router.push("/shopping_cart");
    }
  };

  const handleToggleClick = () => {
    toggleExpanded();
  };

  const handleNavClose = () => {
    closeExpandedNav();
  };

  return (
    <ExpandedNavContext.Provider value={{ closeExpandedNav }}>
      <Navbar expand="lg" expanded={expanded} id="header">
        <Container>
          <Navbar.Brand>
            <Link
              href="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t("components.header.artwork_market_logo")}
                className="d-inline-block align-top"
                src="/logo.png"
                width={UI_DIMENSIONS.THUMBNAIL_SIZE}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-items">
            {/*Shopping cart icon - mobile, non-admin users */}
            {!user.is_admin && (
              <FontAwesomeIcon
                aria-label={t("common.shopping_cart")}
                className="me-3"
                icon={faShoppingCart}
                id="header-mobile-shopping-cart"
                onClick={handleShoppingCartClick}
              />
            )}
            <FontAwesomeIcon
              icon={faBars}
              id="header-toggler"
              onClick={handleToggleClick}
            />
          </Navbar.Toggle>
          <Navbar.Collapse className="mx-3" id="menu-items">
            <Nav className="mx-auto">
              <Link
                className="nav-link"
                href={user.is_admin ? "/admin/artworks" : "/search"}
                onClick={handleNavClose}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                {t("navigation.search")}
              </Link>
              <Link
                className="nav-link"
                href="/about"
                onClick={handleNavClose}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                {t("navigation.about")}
              </Link>
              <Link
                className="nav-link"
                href="/contact"
                onClick={handleNavClose}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                {t("navigation.contact")}
              </Link>

              {loggedIn ? <LoggedInNavbarItems /> : <NotLoggedInNavbarItems />}

              <div
                className="nav-link"
                onClick={handleNavClose}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <LanguageSelector />
              </div>
            </Nav>
          </Navbar.Collapse>

          {/* Shopping cart icon - desktop only, non-admin users */}
          {!user.is_admin && (
            <div className="d-none d-lg-block">
              <FontAwesomeIcon
                aria-label={t("common.shopping_cart")}
                icon={faShoppingCart}
                id="header-desktop-shopping-cart"
                onClick={handleShoppingCartClick}
                size="xl"
                style={{
                  cursor: "pointer",
                  color: "inherit",
                }}
              />
            </div>
          )}
        </Container>
      </Navbar>
    </ExpandedNavContext.Provider>
  );
}

export default Header;
