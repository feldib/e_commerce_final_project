import React from "react";

import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ErrorAsteriskProps = {
  show: boolean;
};

function ErrorAsterisk({ show }: ErrorAsteriskProps) {
  return (
    <>
      {show ? (
        <FontAwesomeIcon
          className="mx-3"
          icon={faAsterisk}
          style={{ color: "red" }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default ErrorAsterisk;
