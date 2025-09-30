"use client";
import React from "react";

import { Container, Row } from "react-bootstrap";

import { USERS_URL } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import Recommendations from "@/components/Recommendations";

function HomePage() {
  const { user, loggedIn } = React.useContext(UserDataContext);
  const { t } = useI18n();
  
  return (
    <Container className="px-3 pb-5">
      <Row className="mx-auto mt-5 mb-5 jumbotron">
        <h1 className="display-2 text-center page-title">
          {t("app.home.welcome_to_artwork_market")}
          {`${loggedIn ? ` ${user.first_name}` : ""}!`}
        </h1>
      </Row>

      <Row className="mx-auto mb-3 d-flex justify-content-evenly">
        <Recommendations title={t("app.home.featured")} path="/featured" />

        <Recommendations title={t("app.home.newest")} path="/newest" />

        <Recommendations title={t("app.home.most_wishlisted")} path="/most_wishlisted" />

        {loggedIn && (
          <Recommendations
            title={t("app.home.wishlisted")}
            path={`/${USERS_URL}/wishlisted`}
          />
        )}
      </Row>
    </Container>
  );
}

export default HomePage;
