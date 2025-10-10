"use client";
import React from "react";

import {
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

import ErrorAsterisk from "@/components/input/ErrorAsterisk/ErrorAsterisk";
import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { updateUserData } from "@/fetching/auth";

type UserDataInputComponentProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: IconDefinition;
  touched: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  changeUserData?: boolean;
};

function UserDataInputComponent({
  label,
  name,
  type,
  placeholder,
  icon,
  touched,
  error,
  onChange,
  onBlur,
  value,
  changeUserData = true,
}: UserDataInputComponentProps) {
  const { t } = useI18n();
  const [editing, setEditing] = React.useState(false);

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <Form.Group className="pb-3">
      <Form.Label>{label}</Form.Label>
      <ErrorAsterisk show={!!(error && touched)} />
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
            onClick={handleSaveClick}
            variant="primary"
          >
            <FontAwesomeIcon className="mx-3" icon={faCheck} />
          </Button>
        ) : (
          <Button
            className="inline-submit-button"
            onClick={handleEditClick}
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

export default UserDataInputComponent;
