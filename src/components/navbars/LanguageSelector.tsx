import { IL, US } from "country-flag-icons/react/3x2";

import { Col, Row } from "react-bootstrap";

const LanguageSelector = () => {
  return (
    <Row>
      <Col>
        <US className="flag-icon" height="18" />
      </Col>

      <Col>
        <IL className="flag-icon" height="18" />
      </Col>
    </Row>
  );
};

export default LanguageSelector;
