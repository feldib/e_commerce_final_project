import { renderHook } from "@testing-library/react";

import useArtworkDescriptionCard from "../useArtworkDescriptionCard";

// Mock providers
jest.mock("../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    locale: "en",
  }),
}));

// Mock hooks;

describe("useArtworkDescriptionCard", () => {
  const mockProps = {
    quantity: 1,
    setQuantity: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return category function", () => {
    const { result } = renderHook(() => useArtworkDescriptionCard(mockProps));

    expect(typeof result.current.getCategoryNameById).toBe("function");
  });

  it("should return quantity decrease handler", () => {
    const { result } = renderHook(() => useArtworkDescriptionCard(mockProps));

    expect(typeof result.current.handleQuantityDecrease).toBe("function");
  });

  it("should return locale and translation function", () => {
    const { result } = renderHook(() => useArtworkDescriptionCard(mockProps));

    expect(result.current.locale).toBe("en");
    expect(typeof result.current.t).toBe("function");
  });

  it("should handle different quantities", () => {
    const differentProps = { quantity: 5, setQuantity: jest.fn() };
    const { result } = renderHook(() =>
      useArtworkDescriptionCard(differentProps)
    );

    expect(result.current).toBeDefined();
  });
});
