import React from "react";

import { faAsterisk, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, InputGroup } from "react-bootstrap";
import { ErrorMessage, Field } from "formik";

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
          className="mx-3"
          icon={faAsterisk}
          style={{ color: "red" }}
        />
      )}
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon className="mx-3" icon={icon} />
        </InputGroup.Text>

        <Field
          className="form-control"
          name={name}
          placeholder={placeholder}
          type={type}
        />
      </InputGroup>
      <ErrorMessage
        className="input-error-message"
        component="div"
        name={name}
      />
    </Form.Group>
  );
}

export default InputComponent;
