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

  return (
    <ExpandedNavContext.Provider value={{ closeExpandedNav }}>
      <Navbar id="header" expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Brand>
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              href="/"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                width={UI_DIMENSIONS.THUMBNAIL_SIZE}
                className="d-inline-block align-top"
                alt={t("components.header.artwork_market_logo")}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-items">
            {/*Shopping cart icon - mobile, non-admin users */}
            {!user.is_admin && (
              <FontAwesomeIcon
                id="header-mobile-shopping-cart"
                className="me-3"
                aria-label={t("common.shopping_cart")}
                icon={faShoppingCart}
                onClick={async () => {
                  const isShoppingCartEmpty =
                    await checkIfShoppingCartIsEmpty(loggedIn);

                  if (!isShoppingCartEmpty) {
                    showCartEmptyWarningToast(t);
                  } else {
                    router.push("/shopping_cart");
                  }
                }}
              />
            )}
            <FontAwesomeIcon
              id="header-toggler"
              icon={faBars}
              onClick={() => toggleExpanded()}
            />
          </Navbar.Toggle>
          <Navbar.Collapse className="mx-3" id="menu-items">
            <Nav className="mx-auto">
              <Link
                onClick={() => closeExpandedNav()}
                className="nav-link"
                style={{ color: "inherit", textDecoration: "inherit" }}
                href={user.is_admin ? "/admin/artworks" : "/search"}
              >
                {t("navigation.search")}
              </Link>
              <Link
                onClick={() => closeExpandedNav()}
                className="nav-link"
                style={{ color: "inherit", textDecoration: "inherit" }}
                href="/about"
              >
                {t("navigation.about")}
              </Link>
              <Link
                onClick={() => closeExpandedNav()}
                className="nav-link"
                style={{ color: "inherit", textDecoration: "inherit" }}
                href="/contact"
              >
                {t("navigation.contact")}
              </Link>

              {loggedIn ? <LoggedInNavbarItems /> : <NotLoggedInNavbarItems />}

              <div
                onClick={() => closeExpandedNav()}
                className="nav-link"
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
                id="header-desktop-shopping-cart"
                aria-label={t("common.shopping_cart")}
                size="xl"
                icon={faShoppingCart}
                style={{
                  cursor: "pointer",
                  color: "inherit",
                }}
                onClick={async () => {
                  const isShoppingCartEmpty =
                    await checkIfShoppingCartIsEmpty(loggedIn);

                  if (!isShoppingCartEmpty) {
                    showCartEmptyWarningToast(t);
                  } else {
                    router.push("/shopping_cart");
                  }
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
