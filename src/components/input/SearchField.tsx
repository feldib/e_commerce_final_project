import React from "react";

import { Form, InputGroup,Row } from "react-bootstrap";

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
    <Row lg={6} sx={8} className="mx-auto mb-1 mt-5">
      <InputGroup>
        <InputGroup.Text>{what}</InputGroup.Text>
        <Form.Control
          className="form-control"
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </InputGroup>
    </Row>
  );
}

export default SearchField;
