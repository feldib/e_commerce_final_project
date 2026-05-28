import { render } from "@testing-library/react";

import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("should render spinner with correct classes", () => {
    const { container } = render(<LoadingSpinner />);

    const spinnerContainer = container.querySelector(
      ".d-flex.justify-content-center"
    );
    expect(spinnerContainer).toBeTruthy();

    const spinner = container.querySelector(".spinner-border");
    expect(spinner).toBeTruthy();
    expect(spinner?.getAttribute("role")).toBe("status");
  });
});
