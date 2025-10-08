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
    <Navbar fixed="bottom" id="footer">
      <Container>
        <Nav className="mx-auto w-full">
          <Link
            className="nav-link"
            href="/about"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            {t("navigation.about")}
          </Link>

          <Link
            className="nav-link"
            href="/contact"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            {t("navigation.contact")}
          </Link>

          <Nav.Link>
            <TelegramShareButton url={hostname}>
              <TelegramIcon round size={25} />
            </TelegramShareButton>
          </Nav.Link>

          <Nav.Link>
            <EmailShareButton url={hostname}>
              <EmailIcon round size={25} />
            </EmailShareButton>
          </Nav.Link>

          <Nav.Link>
            <RedditShareButton url={hostname}>
              <RedditIcon round size={25} />
            </RedditShareButton>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
