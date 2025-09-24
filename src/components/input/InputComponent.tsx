import React from "react";

import { faAsterisk, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, InputGroup } from "react-bootstrap";
import { ErrorMessage,Field } from "formik";

type InputComponentProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: IconDefinition;
  showAsterisk?: boolean;
};

function InputComponent({
  label,
  name,
  type,
  placeholder,
  icon,
  showAsterisk = false,
}: InputComponentProps) {
  return (
    <Form.Group className="pb-3">
      <Form.Label>{label}</Form.Label>
      {showAsterisk && (
        <FontAwesomeIcon
          icon={faAsterisk}
          style={{ color: "red" }}
          className="mx-3"
        />
      )}
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={icon} className="mx-3" />
        </InputGroup.Text>

        <Field
          className="form-control"
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </InputGroup>
      <ErrorMessage
        component="div"
        className="input-error-message"
        name={name}
      />
    </Form.Group>
  );
}

export default InputComponent;
