import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import ArtworkSearchComponent from "@/components/input/ArtworkSearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Search() {
  return (
    <Container className="pb-5 mb-5">
      <PageTitle title="Artworks" />

      <Row>
        <Col className="floating-element mx-auto mb-4" xs={5} md={4} lg={3}>
          <Link href="/admin/add_new_artwork">
            <p>
              <FontAwesomeIcon icon={faPlus} />
              <span> Add new artwork</span>
            </p>
          </Link>
        </Col>
      </Row>

      <ArtworkSearchComponent admin={true} />
    </Container>
  );
}

export default Search;
