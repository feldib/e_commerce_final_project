import React from "react";
import { render } from "@testing-library/react";

import Footer from "../Footer";

// Use reusable mocks
jest.mock("@/components/providers/I18nProvider/I18nProvider");

describe("Footer", () => {
  it("should render without crashing", () => {
    render(<Footer />);

    expect(document.body).toBeTruthy();
  });
});
