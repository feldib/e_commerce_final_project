import React from "react";
import { render } from "@testing-library/react";

import Footer from "../Footer";

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe("Footer", () => {
  it("should render without crashing", () => {
    render(<Footer />);

    expect(document.body).toBeTruthy();
  });
});
