import React from "react";
import { Row, Form, InputGroup } from "react-bootstrap";

type SearchFieldProps = {
  what: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function SearchField(props: SearchFieldProps) {
  return (
    <Row lg={6} sx={8} className="mx-auto mb-1 mt-5">
      <InputGroup>
        <InputGroup.Text>{props.what}</InputGroup.Text>
        <Form.Control
          className="form-control"
          type="text"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </InputGroup>
    </Row>
  );
}

export default SearchField;
