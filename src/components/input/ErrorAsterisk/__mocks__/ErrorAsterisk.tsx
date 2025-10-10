/**
 * Mock for ErrorAsterisk component
 */
import React from "react";

interface ErrorAsteriskProps {
  show?: boolean;
}

const ErrorAsterisk: React.FC<ErrorAsteriskProps> = () => {
  return <div data-testid="error-asterisk">*</div>;
};

export default ErrorAsterisk;
