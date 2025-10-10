import React from "react";
import { render } from "@testing-library/react";

import RemoveArtworkButton from "../RemoveArtworkButton";

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe("RemoveArtworkButton", () => {
  const mockProps = {
    removeLineFromView: jest.fn(),
    artwork_id: 123,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<RemoveArtworkButton {...mockProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should render button element", () => {
    render(<RemoveArtworkButton {...mockProps} />);

    const button = document.querySelector("button");
    expect(button).toBeTruthy();
  });

  it("should handle different artwork IDs", () => {
    const differentProps = { ...mockProps, artwork_id: 456 };
    render(<RemoveArtworkButton {...differentProps} />);

    expect(document.querySelector("button")).toBeTruthy();
  });
});
