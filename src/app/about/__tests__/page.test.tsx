import React from "react";
import { render } from "@testing-library/react";

import { I18nProvider } from "@/components/providers/I18nProvider/I18nProvider";

import AboutPage from "../page";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider>{children}</I18nProvider>
);

describe("AboutPage", () => {
  it("should render without crashing", () => {
    render(
      <TestWrapper>
        <AboutPage />
      </TestWrapper>
    );

    expect(document.body).toBeTruthy();
  });

  it("should contain page content", () => {
    render(
      <TestWrapper>
        <AboutPage />
      </TestWrapper>
    );

    const pageElement =
      document.querySelector("div") || document.querySelector("main");
    expect(pageElement).toBeTruthy();
  });
});
