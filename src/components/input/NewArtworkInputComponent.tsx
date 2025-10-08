import React from "react";

import { faAsterisk, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, InputGroup } from "react-bootstrap";
import { FormikProps } from "formik";

import { preventNonNumericInput } from "@/helpers/inputHelpers";

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
          className="mx-3"
          icon={faAsterisk}
          style={{ color: "red" }}
        />
      )}
      <InputGroup>
        {type !== "textarea" && (
          <InputGroup.Text>
            <FontAwesomeIcon className="mx-3" icon={icon} />
          </InputGroup.Text>
        )}

        {type === "textarea" ? (
          <textarea
            className="form-control"
            id={name}
            name={name}
            onChange={formik.handleChange}
            placeholder={placeholder}
            rows={4}
            value={String(formik.values[name] || "")}
          />
        ) : (
          <input
            className="form-control"
            id={name}
            name={name}
            onChange={formik.handleChange}
            onKeyDown={(e) => {
              if (type === "number") {
                preventNonNumericInput(e);
              }
            }}
            placeholder={placeholder}
            type={type}
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
