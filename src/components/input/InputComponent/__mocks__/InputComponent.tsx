/**
 * Mock for InputComponent
 */
import React from "react";

interface InputComponentProps {
  name: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  [key: string]: unknown;
}

const InputComponent: React.FC<InputComponentProps> = ({
  name,
  type = "text",
  ...props
}) => {
  return (
    <div data-testid={`input-component-${name}`}>
      <input data-testid={`input-${name}`} name={name} type={type} {...props} />
    </div>
  );
};

export default InputComponent;
