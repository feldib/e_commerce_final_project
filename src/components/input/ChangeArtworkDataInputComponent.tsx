"use client";
import React from "react";

import {
  faAsterisk,
  faCheck,
  faGear,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FormikProps } from "formik";

import {
  showChangesSavedToast,
  showDataSaveErrorToast,
  showIncorrectDataToast,
} from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider";

import { updateArtworkData } from "@/fetching/fetching";

import { preventNonNumericInput } from "@/helpers/inputHelpers";

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
  const { t } = useI18n();
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
            onKeyDown={(e) => {
              if (type === "number") {
                preventNonNumericInput(e);
              }
            }}
          />
        )}

        {editing ? (
          <Button
            variant="primary"
            className="inline-submit-button"
            onClick={async (e) => {
              e.preventDefault();

              // Only check for errors in the current field being updated, not the entire form
              const currentFieldError = formik.errors[name];
              const hasCurrentFieldError =
                currentFieldError && formik.touched[name];

              if (hasCurrentFieldError) {
                showIncorrectDataToast(t);
              } else {
                try {
                  await updateArtworkData(
                    artwork_id,
                    name,
                    String(formik.values[name] || ""),
                  );
                  showChangesSavedToast(t);
                  setEditing(false);
                } catch {
                  showDataSaveErrorToast(t);
                }
              }
            }}
          >
            <FontAwesomeIcon icon={faCheck} className="mx-3" />
          </Button>
        ) : (
          <Button
            variant="primary"
            className="inline-submit-button"
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
