import React from "react";

import { Container } from "react-bootstrap";

import ArtworkSearchComponent from "@/components/input/ArtworkSearchComponent";
import PageTitle from "@/components/PageTitle";

function Search() {
  return (
    <Container className="pb-5 mb-5">
      <PageTitle title="Search" />

      <ArtworkSearchComponent admin={false} />
    </Container>
  );
}

export default Search;
