import { renderHook } from "@testing-library/react";

import useHeader from "../useHeader";

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

// Mock router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/test-path",
}));

describe("useHeader", () => {
  it("should return header functionality without crashing", () => {
    const { result } = renderHook(() => useHeader());

    expect(result).toBeTruthy();
  });
});
