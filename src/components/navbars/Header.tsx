"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import LoggedInNavbarItems from "./LoggedInNavbarItems";
import NotLoggedInNavbarItems from "./NotLoggedInNavbarItems";
import { toast } from "react-toastify";
import { checkIfShoppingCartIsEmpty } from "@/helpers/helpers";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import { useRouter } from "next/navigation";

export const ExpandedNavContext = React.createContext({
  closeExpandedNav: () => {},
});

function Header() {
  const router = useRouter();

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
                width="100"
                className="d-inline-block align-top"
                alt="Artwork market logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-items">
            {/*Shopping cart icon - mobile, non-admin users */}
            {!user.is_admin && (
              <FontAwesomeIcon
                id="header-mobile-shopping-cart"
                className="me-3"
                aria-label="Shopping cart"
                icon={faShoppingCart}
                onClick={async () => {
                  const isShoppingCartEmpty =
                    await checkIfShoppingCartIsEmpty(loggedIn);

                  if (!isShoppingCartEmpty) {
                    toast.warning("Shopping list is empty.", {
                      className: "toast-warning",
                    });
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
                Search
              </Link>
              <Link
                onClick={() => closeExpandedNav()}
                className="nav-link"
                style={{ color: "inherit", textDecoration: "inherit" }}
                href="/about"
              >
                About
              </Link>
              <Link
                onClick={() => closeExpandedNav()}
                className="nav-link"
                style={{ color: "inherit", textDecoration: "inherit" }}
                href="/contact"
              >
                Contact
              </Link>

              {loggedIn ? <LoggedInNavbarItems /> : <NotLoggedInNavbarItems />}
            </Nav>
          </Navbar.Collapse>

          {/* Shopping cart icon - desktop only, non-admin users */}
          {!user.is_admin && (
            <div className="d-none d-lg-block">
              <FontAwesomeIcon
                id="header-desktop-shopping-cart"
                aria-label="Shopping cart"
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
                    toast.warning("Shopping list is empty.", {
                      className: "toast-warning",
                    });
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
