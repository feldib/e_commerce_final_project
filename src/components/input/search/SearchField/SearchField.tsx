import React from "react";

import { Form, InputGroup, Row } from "react-bootstrap";

type SearchFieldProps = {
  what: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function SearchField({
  what,
  name,
  value,
  onChange,
  onBlur,
}: SearchFieldProps) {
  return (
    <Row className="mx-auto mb-1 mt-5" lg={6} sx={8}>
      <InputGroup>
        <InputGroup.Text>{what}</InputGroup.Text>
        <Form.Control
          className="form-control"
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          type="text"
          value={value}
        />
      </InputGroup>
    </Row>
  );
}

export default SearchField;
