"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import LoggedInNavbarItems from "./LoggedInNavbarItems";
import NotLoggedInNavbarItems from "./NotLoggedInNavbarItems";
import { toast } from "react-toastify";
import useShoppingList from "../../hooks/useShoppingList";
import { checkIfShoppingCartIsEmpty } from "../../helpers/helpers";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import { useRouter } from "next/navigation";

export const ExpandedNavContext = React.createContext({
  closeExpandedNav: () => {},
});

function Header() {
  const router = useRouter();

  const { user, loggedIn } = React.useContext(UserDataContext);

  let shoppingListItems = useShoppingList(loggedIn);

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
              <img
                src="/logo.png"
                width="100"
                className="d-inline-block align-top"
                alt="Artwork market logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={() => toggleExpanded()}
            aria-controls="menu-items"
          >
            <FontAwesomeIcon id="header-toggler" icon={faBars} />
          </Navbar.Toggle>
          <Navbar.Collapse className="mx-3" id="menu-items">
            <Nav className="mx-auto">
              <Link
                onClick={() => closeExpandedNav()}
                className="nav-link"
                style={{ color: "inherit", textDecoration: "inherit" }}
                href="/search"
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

              {!user.is_admin && (
                <a
                  className="nav-link"
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                    cursor: "pointer",
                  }}
                  href="#"
                  onClick={async () => {
                    closeExpandedNav();

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
                >
                  Shopping cart
                </a>
              )}

              {loggedIn ? <LoggedInNavbarItems /> : <NotLoggedInNavbarItems />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </ExpandedNavContext.Provider>
  );
}

export default Header;
