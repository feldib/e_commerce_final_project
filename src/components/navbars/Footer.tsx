"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import {
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
} from "next-share";

function Footer() {
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);
  return (
    <Navbar id="footer" fixed="bottom">
      <Container>
        <Nav className="mx-auto w-full">
          <Link
            className="nav-link"
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/about"
          >
            About
          </Link>

          <Link
            className="nav-link"
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/contact"
          >
            Contact
          </Link>

          <Nav.Link>
            <TelegramShareButton url={hostname}>
              <TelegramIcon size={25} round />
            </TelegramShareButton>
          </Nav.Link>

          <Nav.Link>
            <EmailShareButton url={hostname}>
              <EmailIcon size={25} round />
            </EmailShareButton>
          </Nav.Link>

          <Nav.Link>
            <RedditShareButton url={hostname}>
              <RedditIcon size={25} round />
            </RedditShareButton>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
