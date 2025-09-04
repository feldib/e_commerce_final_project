import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import ArtworkSearchComponent from "../../components/input/ArtworkSearchComponent";

function Search() {
  return (
    <Container className="pb-5 mb-5">
      <PageTitle title="Search" />

      <ArtworkSearchComponent admin={false} />
    </Container>
  );
}

export default Search;
