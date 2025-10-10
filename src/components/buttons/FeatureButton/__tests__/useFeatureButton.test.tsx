import { renderHook } from "@testing-library/react";

import useFeatureButton from "../useFeatureButton";

// Mock fetching functions

describe("useFeatureButton", () => {
  const mockProps = {
    artwork_id: 123,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return feature handling functions", () => {
    const { result } = renderHook(() => useFeatureButton(mockProps));

    expect(typeof result.current.addToAdded).toBe("function");
    expect(typeof result.current.removeFromAdded).toBe("function");
    expect(typeof result.current.isAdded).toBe("function");
  });

  it("should return artwork_id", () => {
    const { result } = renderHook(() => useFeatureButton(mockProps));

    expect(result.current.artwork_id).toBe(123);
  });

  it("should return button elements", () => {
    const { result } = renderHook(() => useFeatureButton(mockProps));

    expect(result.current.filledButton).toBeDefined();
    expect(result.current.regularButton).toBeDefined();
  });
});
