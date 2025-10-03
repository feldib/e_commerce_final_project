import React from "react";

function preventNonNumericInput(event: React.KeyboardEvent<HTMLInputElement>) {
  // Allow: backspace, delete, tab, escape, enter, home, end, arrow keys
  if (
    [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "Home",
      "End",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ].includes(event.key) ||
    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    (event.ctrlKey && ["a", "c", "v", "x"].includes(event.key))
  ) {
    return;
  }
  // Ensure that it is a number and stop the keypress
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
}

export { preventNonNumericInput };
