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

import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "@/utils/toastUtils";

import { updateUserData } from "@/fetching/fetching";

type UserDataInputComponentsProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: IconDefinition;
  showAsterisk?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  changeUserData?: boolean;
};

function UserDataInputComponents({
  label,
  name,
  type,
  placeholder,
  icon,
  showAsterisk = false,
  error,
  onChange,
  onBlur,
  value,
  changeUserData = true,
}: UserDataInputComponentsProps) {
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
        <InputGroup.Text>
          <FontAwesomeIcon icon={icon} className="mx-3" />
        </InputGroup.Text>

        <Form.Control
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={value}
          disabled={!editing}
        />

        {editing ? (
          <Button
            variant="primary"
            className="inline-submit-button"
            onClick={(e) => {
              e.preventDefault();
              if (error) {
                showErrorToast("Incorrect data");
              } else {
                if (changeUserData) {
                  updateUserData(name, value);
                  showSuccessToast(`${label} changed successfully`);
                } else {
                  showSuccessToast(`${label} changed successfully`);
                  showWarningToast(`This only effects the invoice!`);
                }
                setEditing(false);
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
      {error ? <div className="input-error-message">{error}</div> : null}
    </Form.Group>
  );
}

export default UserDataInputComponents;
