import { render } from "@testing-library/react";

import ErrorAsterisk from "../ErrorAsterisk";

describe("ErrorAsterisk", () => {
  it("should render FontAwesome icon when show is true", () => {
    const { container } = render(<ErrorAsterisk show={true} />);

    const icon = container.querySelector("svg");
    expect(icon).toBeTruthy();
  });

  it("should not render icon when show is false", () => {
    const { container } = render(<ErrorAsterisk show={false} />);

    const icon = container.querySelector("svg");
    expect(icon).toBeFalsy();
  });
});
