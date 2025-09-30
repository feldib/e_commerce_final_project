"use client";

import { HU, IL, US } from "country-flag-icons/react/3x2";

import { Col, Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

const LanguageSelector = () => {
  const { locale, setLocale } = useI18n();

  return (
    <Row>
      <Col>
        <US
          className="flag-icon"
          height="18"
          onClick={() => setLocale("en")}
          style={{
            opacity: locale === "en" ? 1 : 0.6,
            cursor: "pointer",
          }}
        />
      </Col>

      <Col>
        <IL
          className="flag-icon"
          height="18"
          onClick={() => setLocale("he")}
          style={{
            opacity: locale === "he" ? 1 : 0.6,
            cursor: "pointer",
          }}
        />
      </Col>

      <Col>
        <HU
          className="flag-icon"
          height="18"
          onClick={() => setLocale("hu")}
          style={{
            opacity: locale === "hu" ? 1 : 0.6,
            cursor: "pointer",
          }}
        />
      </Col>
    </Row>
  );
};

export default LanguageSelector;
