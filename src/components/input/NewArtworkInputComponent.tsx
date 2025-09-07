import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup } from "react-bootstrap";
import { FormikProps } from "formik";

type NewArtworkInputComponentProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  label: string;
  name: string & keyof T;
  type: string;
  placeholder: string;
  icon: IconDefinition;
  formik: FormikProps<T>;
};

function NewArtworkInputComponent<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  label,
  name,
  type,
  placeholder,
  icon,
  formik,
}: NewArtworkInputComponentProps<T>) {
  const showAsterisk = formik.errors[name] && formik.touched[name];
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
        {type !== "textarea" && (
          <InputGroup.Text>
            <FontAwesomeIcon icon={icon} className="mx-3" />
          </InputGroup.Text>
        )}

        {type === "textarea" ? (
          <textarea
            className="form-control"
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={formik.handleChange}
            value={String(formik.values[name] || "")}
            rows={4}
          />
        ) : (
          <input
            className="form-control"
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={formik.handleChange}
            value={String(formik.values[name] || "")}
          />
        )}
      </InputGroup>

      {formik.errors[name] && (
        <div className="input-error-message">{String(formik.errors[name])}</div>
      )}
    </Form.Group>
  );
}

export default NewArtworkInputComponent;
