import { preventNonNumericInput } from "../inputHelpers";

// Create a mock keyboard event
const createKeyboardEvent = (
  key: string,
  ctrlKey = false
): React.KeyboardEvent<HTMLInputElement> => {
  const event = {
    key,
    ctrlKey,
    preventDefault: jest.fn(),
  } as unknown as React.KeyboardEvent<HTMLInputElement>;
  return event;
};

describe("inputHelpers", () => {
  describe("preventNonNumericInput", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should allow numeric keys", () => {
      const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      numbers.forEach((number) => {
        const event = createKeyboardEvent(number);
        preventNonNumericInput(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
      });
    });

    it("should allow navigation keys", () => {
      const navigationKeys = [
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
      ];

      navigationKeys.forEach((key) => {
        const event = createKeyboardEvent(key);
        preventNonNumericInput(event);
        expect(event.preventDefault).not.toHaveBeenCalled();
      });
    });

    it("should allow Ctrl+A (select all)", () => {
      const event = createKeyboardEvent("a", true);
      preventNonNumericInput(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it("should allow Ctrl+C (copy)", () => {
      const event = createKeyboardEvent("c", true);
      preventNonNumericInput(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it("should allow Ctrl+V (paste)", () => {
      const event = createKeyboardEvent("v", true);
      preventNonNumericInput(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it("should allow Ctrl+X (cut)", () => {
      const event = createKeyboardEvent("x", true);
      preventNonNumericInput(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it("should prevent non-numeric characters", () => {
      const nonNumericKeys = [
        "a",
        "b",
        "z",
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "-",
        "=",
        "+",
        "[",
        "]",
        "{",
        "}",
      ];

      nonNumericKeys.forEach((key) => {
        const event = createKeyboardEvent(key);
        preventNonNumericInput(event);
        expect(event.preventDefault).toHaveBeenCalled();
      });
    });

    it("should prevent letters without Ctrl modifier", () => {
      const letters = ["a", "c", "v", "x"];

      letters.forEach((letter) => {
        const event = createKeyboardEvent(letter, false);
        preventNonNumericInput(event);
        expect(event.preventDefault).toHaveBeenCalled();
      });
    });

    it("should prevent special characters", () => {
      const specialChars = [" ", ".", ",", "/", "\\", "|", "~", "`"];

      specialChars.forEach((char) => {
        const event = createKeyboardEvent(char);
        preventNonNumericInput(event);
        expect(event.preventDefault).toHaveBeenCalled();
      });
    });
  });
});
