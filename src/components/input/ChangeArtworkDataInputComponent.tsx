"use client"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faCheck, faGear } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateArtworkData } from "@/fetching/fetching";

type ChangeArtworkDataInputComponentProps = {
  formik: any;
  name: string;
  label: string;
  type: string;
  icon: any;
  artwork_id: number;
  placeholder: string;
};

function ChangeArtworkDataInputComponent(
  props: ChangeArtworkDataInputComponentProps,
) {
  const showAsterisk =
    props.formik.errors[props.name] && props.formik.touched[props.name];
  const [editing, setEditing] = React.useState(false);

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
            disabled={!editing}
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
            disabled={!editing}
          />
        )}

        {editing ? (
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              if (props.formik.error) {
                toast.error("Incorrect data", {
                  className: "toast-error",
                });
              } else {
                updateArtworkData(
                  props.artwork_id,
                  props.name,
                  props.formik.values[props.name],
                );
                toast.success(`${props.label} changed successfully`, {
                  className: "toast-success",
                });
                setEditing(false);
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

      {props.formik.errors[props.name] && (
        <div className="input-error-message">
          {props.formik.errors[props.name]}
        </div>
      )}
    </Form.Group>
  );
}

export default ChangeArtworkDataInputComponent;
