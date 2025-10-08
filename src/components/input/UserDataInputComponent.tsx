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
  showChangesSavedToast,
  showIncorrectDataToast,
  showInvoiceNoticeToast,
} from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider";

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
  const { t } = useI18n();
  const [editing, setEditing] = React.useState(false);
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

        <Form.Control
          defaultValue={value}
          disabled={!editing}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />

        {editing ? (
          <Button
            className="inline-submit-button"
            onClick={(e) => {
              e.preventDefault();
              if (error) {
                showIncorrectDataToast(t);
              } else {
                if (changeUserData) {
                  updateUserData(name, value);
                  showChangesSavedToast(t);
                } else {
                  showChangesSavedToast(t);
                  showInvoiceNoticeToast(t);
                }
                setEditing(false);
              }
            }}
            variant="primary"
          >
            <FontAwesomeIcon className="mx-3" icon={faCheck} />
          </Button>
        ) : (
          <Button
            className="inline-submit-button"
            onClick={() => {
              setEditing(true);
            }}
            variant="primary"
          >
            <FontAwesomeIcon className="mx-3" icon={faGear} />
          </Button>
        )}
      </InputGroup>
      {error ? <div className="input-error-message">{error}</div> : null}
    </Form.Group>
  );
}

export default UserDataInputComponents;
