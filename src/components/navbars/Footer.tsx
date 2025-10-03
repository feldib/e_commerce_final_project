"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import {
  EmailIcon,
  EmailShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "next-share";

import { Container, Nav, Navbar } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

function Footer() {
  const [hostname, setHostname] = useState("");
  const { t } = useI18n();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname);
    }
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
            {t("navigation.about")}
          </Link>

          <Link
            className="nav-link"
            style={{ color: "inherit", textDecoration: "inherit" }}
            href="/contact"
          >
            {t("navigation.contact")}
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
