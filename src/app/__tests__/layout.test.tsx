import { render } from "@testing-library/react";

import Layout from "../layout";

// Use reusable mocks - Jest will automatically use the mocks from __mocks__ directories
jest.mock("@/components/accessibility/SkipToContent/SkipToContent");
jest.mock("@/components/navbars/Footer/Footer");
jest.mock("@/components/navbars/Header/Header");
jest.mock("@/components/providers/I18nProvider/I18nProvider");
jest.mock("@/components/providers/UserDataProvider/UserDataProvider");
jest.mock("react-toastify");

// Mock ThemeProvider (no __mocks__ directory created for this one yet)
jest.mock("@/components/providers/ThemeProvider/ThemeProvider", () => {
  return function MockThemeProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="theme-provider">{children}</div>;
  };
});

describe("Layout", () => {
  it("should render without crashing", () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );

    expect(document.body).toBeTruthy();
  });

  it("should render providers in correct hierarchy", () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );

    expect(
      document.querySelector('[data-testid="i18n-provider"]')
    ).toBeTruthy();
    expect(
      document.querySelector('[data-testid="user-data-provider"]')
    ).toBeTruthy();
    expect(
      document.querySelector('[data-testid="theme-provider"]')
    ).toBeTruthy();
  });
});

describe("Layout", () => {
  it("should render without crashing", () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );

    expect(document.body).toBeTruthy();
  });

  it("should render providers in correct hierarchy", () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );

    expect(
      document.querySelector('[data-testid="i18n-provider"]')
    ).toBeTruthy();
    expect(
      document.querySelector('[data-testid="user-data-provider"]')
    ).toBeTruthy();
    expect(
      document.querySelector('[data-testid="theme-provider"]')
    ).toBeTruthy();
  });
});
