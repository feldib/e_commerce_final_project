"use client";
import React from "react";
import { Row, Container } from "react-bootstrap";
import { users_url } from "@/utils/api_constants";
import Reccomendations from "@/components/Reccomendations";
import { UserDataContext } from "@/components/providers/UserDataProvider";

function HomePage() {
  const { user, loggedIn } = React.useContext(UserDataContext);
  return (
    <Container className="px-3 pb-5">
      <Row className="mx-auto mt-5 mb-5 jumbotron">
        <h1 className="display-2 text-center page-title">
          Welcome to Artworks Market
          {`${loggedIn ? ` ${user.first_name}` : ""}!`}
        </h1>
      </Row>

      <Row className="mx-auto mb-3 d-flex justify-content-evenly">
        <Reccomendations title="Featured" path="/featured" />

        <Reccomendations title="Newest" path="/newest" />

        <Reccomendations title="Most wishlisted" path="/most_wishlisted" />

        {loggedIn && (
          <Reccomendations
            title="Wishlisted"
            path={`/${users_url}/wishlisted`}
          />
        )}
      </Row>
    </Container>
  );
}

export default HomePage;
