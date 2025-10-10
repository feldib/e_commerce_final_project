import { render } from "@testing-library/react";

import Layout from "../layout";

// Mock the components
jest.mock("@/components/accessibility/SkipToContent/SkipToContent", () => {
  return function MockSkipToContent() {
    return <div data-testid="skip-to-content">Skip to content</div>;
  };
});

jest.mock("@/components/navbars/Footer/Footer", () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

jest.mock("@/components/navbars/Header/Header", () => {
  return function MockHeader() {
    return <header data-testid="header">Header</header>;
  };
});

jest.mock("@/components/providers/I18nProvider/I18nProvider", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="i18n-provider">{children}</div>
  ),
  useI18n: () => ({ locale: "en" }),
}));

jest.mock("@/components/providers/ThemeProvider/ThemeProvider", () => {
  return function MockThemeProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="theme-provider">{children}</div>;
  };
});

jest.mock("@/components/providers/UserDataProvider/UserDataProvider", () => {
  return function MockUserDataProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="user-data-provider">{children}</div>;
  };
});

jest.mock("react-toastify", () => ({
  ToastContainer: () => (
    <div data-testid="toast-container">Toast Container</div>
  ),
}));

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
