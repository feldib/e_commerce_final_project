"use client";
import React from "react";

import Link from "next/link";

import { Button, Col, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

type BackToShopButtonProps = {
  onClick: () => void;
};

function BackToShopButton({ onClick }: BackToShopButtonProps) {
  const { t } = useI18n();

  return (
    <Row>
      <Col className="text-center mb-5">
        <Link href="/">
          <Button className="submit" onClick={onClick}>
            {t("common.back_to_shop")}
          </Button>
        </Link>
      </Col>
    </Row>
  );
}

export default BackToShopButton;
