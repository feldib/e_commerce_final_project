"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAsterisk,
  faCheck,
  faGear,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateArtworkData } from "@/fetching/fetching";
import { FormikProps } from "formik";

type ChangeArtworkDataInputComponentProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  formik: FormikProps<T>;
  name: string & keyof T;
  label: string;
  type: string;
  icon: IconDefinition;
  artwork_id: number;
  placeholder: string;
};

function ChangeArtworkDataInputComponent<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  formik,
  name,
  label,
  type,
  icon,
  artwork_id,
  placeholder,
}: ChangeArtworkDataInputComponentProps<T>) {
  const showAsterisk = formik.errors[name] && formik.touched[name];
  const [editing, setEditing] = React.useState(false);

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
            disabled={!editing}
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
            disabled={!editing}
          />
        )}

        {editing ? (
          <Button
            variant="primary"
            onClick={async (e) => {
              e.preventDefault();

              // Only check for errors in the current field being updated, not the entire form
              const currentFieldError = formik.errors[name];
              const hasCurrentFieldError =
                currentFieldError && formik.touched[name];

              if (hasCurrentFieldError) {
                toast.error("Incorrect data", {
                  className: "toast-error",
                });
              } else {
                try {
                  await updateArtworkData(
                    artwork_id,
                    name,
                    String(formik.values[name] || "")
                  );
                  toast.success(`${label} changed successfully`, {
                    className: "toast-success",
                  });
                  setEditing(false);
                } catch (error) {
                  toast.error("Error updating artwork data", {
                    className: "toast-error",
                  });
                  console.error("Error updating artwork:", error);
                }
              }
            }}
          >
            <FontAwesomeIcon icon={faCheck} className="mx-3" />
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => {
              setEditing(true);
            }}
          >
            <FontAwesomeIcon icon={faGear} className="mx-3" />
          </Button>
        )}
      </InputGroup>

      {formik.errors[name] && (
        <div className="input-error-message">{String(formik.errors[name])}</div>
      )}
    </Form.Group>
  );
}

export default ChangeArtworkDataInputComponent;
