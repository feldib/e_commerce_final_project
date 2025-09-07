import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup } from "react-bootstrap";

type NewArtworkInputComponentProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: IconDefinition;
  formik: any;
};

function NewArtworkInputComponent(props: NewArtworkInputComponentProps) {
  const showAsterisk =
    props.formik.errors[props.name] && props.formik.touched[props.name];
  return (
    <Form.Group className="pb-3">
      <Form.Label>{props.label}</Form.Label>
      {showAsterisk && (
        <FontAwesomeIcon
          icon={faAsterisk}
          style={{ color: "red" }}
          className="mx-3"
        />
      )}
      <InputGroup>
        {props.type !== "textarea" && (
          <InputGroup.Text>
            <FontAwesomeIcon icon={props.icon} className="mx-3" />
          </InputGroup.Text>
        )}

        {props.type === "textarea" ? (
          <textarea
            className="form-control"
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.formik.handleChange}
            value={props.formik.values[props.name]}
            rows={4}
          />
        ) : (
          <input
            className="form-control"
            id={props.name}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.formik.handleChange}
            value={props.formik.values[props.name]}
          />
        )}
      </InputGroup>

      {props.formik.errors[props.name] && (
        <div className="input-error-message">
          {props.formik.errors[props.name]}
        </div>
      )}
    </Form.Group>
  );
}

export default NewArtworkInputComponent;
