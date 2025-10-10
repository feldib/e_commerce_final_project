"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";
import BuyTable from "@/components/tables/buy/BuyTable/BuyTable";

import { Artwork } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

interface UseUserWishlistReturn {
  t: (key: string) => string;
  wishlistContent: React.ReactElement;
}

function useUserWishlist(): UseUserWishlistReturn {
  const { t } = useI18n();
  const wishListed = useAxios("/users/wishlisted") as Artwork[];

  const wishlistContent = useLoading(wishListed, (data) => (
    <Row className="mx-auto floating-element">
      {data.length !== 0 ? (
        <BuyTable dataLines={data} />
      ) : (
        <Col className="text-center">
          {t("app.user.wishlist.no_wishlisted_items")}
        </Col>
      )}
    </Row>
  ));

  return {
    t,
    wishlistContent,
  };
}

export default useUserWishlist;
