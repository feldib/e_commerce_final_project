import React from "react";

import Link from "next/link";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

import SkipToSubpageContent from "@/components/accessibility/SkipToSubpageContent/SkipToSubpageContent";

type SubNavbarProps = {
  linkObjects: Array<{
    linkTo: string;
    icon: IconDefinition;
    linkText: string;
  }>;
};

function SubNavbar({ linkObjects }: SubNavbarProps) {
  return (
    <Row>
      <SkipToSubpageContent />
      <Navbar>
        <Container>
          <Nav className="subnavbar d-flex flex-wrap mx-3 justify-content-around w-100 floating-element">
            {linkObjects.map((obj, index) => {
              return (
                <Link
                  className="nav-link"
                  href={`${obj.linkTo}`}
                  key={index}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Col>
                    <Row className="text-center">
                      <Col>
                        <FontAwesomeIcon icon={obj.icon} size="2xl" />
                      </Col>
                    </Row>
                    <Row className="text-center">
                      <Col>
                        <p>{obj.linkText}</p>
                      </Col>
                    </Row>
                  </Col>
                </Link>
              );
            })}
          </Nav>
        </Container>
      </Navbar>
    </Row>
  );
}

export default SubNavbar;
