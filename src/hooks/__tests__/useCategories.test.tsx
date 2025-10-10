import { renderHook } from "@testing-library/react";

import { Category } from "@/fetching/types";

import useAxios from "../useAxios";
import { useCategories } from "../useCategories";

// Mock useAxios
jest.mock("../useAxios");
const mockUseAxios = useAxios as jest.MockedFunction<typeof useAxios>;

const mockCategories: Category[] = [
  {
    id: 1,
    removed: false,
    translations: {
      en: "Paintings",
      he: "ציורים",
      hu: "Festmények",
    },
  },
  {
    id: 2,
    removed: false,
    translations: {
      en: "Sculptures",
      he: "פסלים",
    },
  },
  {
    id: 3,
    removed: false,
    translations: {
      en: "Photography",
    },
  },
  {
    id: 4,
    removed: false,
    translations: {},
  },
  {
    id: 5,
    removed: false,
    translations: null as unknown as { [languageCode: string]: string },
  },
];

describe("useCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return categories from useAxios", () => {
    mockUseAxios.mockReturnValue(mockCategories);

    const { result } = renderHook(() => useCategories("en"));

    expect(result.current.categories).toEqual(mockCategories);
    expect(mockUseAxios).toHaveBeenCalledWith("/categories");
  });

  describe("getCategoryName", () => {
    beforeEach(() => {
      mockUseAxios.mockReturnValue(mockCategories);
    });

    it("should return category name in requested locale", () => {
      const { result } = renderHook(() => useCategories("he"));

      const categoryName = result.current.getCategoryName(mockCategories[0]);

      expect(categoryName).toBe("ציורים");
    });

    it("should fallback to English when requested locale is not available", () => {
      const { result } = renderHook(() => useCategories("fr"));

      const categoryName = result.current.getCategoryName(mockCategories[0]);

      expect(categoryName).toBe("Paintings");
    });

    it("should fallback to English for partial translations", () => {
      const { result } = renderHook(() => useCategories("hu"));

      const categoryName = result.current.getCategoryName(mockCategories[1]);

      expect(categoryName).toBe("Sculptures");
    });

    it("should return first available translation when English is not available", () => {
      const categoryWithoutEn: Category = {
        id: 6,
        removed: false,
        translations: {
          fr: "Spécial",
          de: "Besonders",
        },
      };

      const { result } = renderHook(() => useCategories("en"));

      const categoryName = result.current.getCategoryName(categoryWithoutEn);

      expect(["Spécial", "Besonders"]).toContain(categoryName);
    });

    it("should return empty string for category with empty translations", () => {
      const { result } = renderHook(() => useCategories("en"));

      const categoryName = result.current.getCategoryName(mockCategories[3]);

      expect(categoryName).toBe("");
    });

    it("should return empty string for category with null translations", () => {
      const { result } = renderHook(() => useCategories("en"));

      const categoryName = result.current.getCategoryName(mockCategories[4]);

      expect(categoryName).toBe("");
    });

    it("should return empty string for null/undefined category", () => {
      const { result } = renderHook(() => useCategories("en"));

      const categoryName = result.current.getCategoryName(
        null as unknown as Category
      );

      expect(categoryName).toBe("");
    });
  });

  describe("getCategoryNameById", () => {
    beforeEach(() => {
      mockUseAxios.mockReturnValue(mockCategories);
    });

    it("should return category name for existing category ID", () => {
      const { result } = renderHook(() => useCategories("en"));

      const categoryName = result.current.getCategoryNameById(1);

      expect(categoryName).toBe("Paintings");
    });

    it("should return category name in correct locale for existing ID", () => {
      const { result } = renderHook(() => useCategories("he"));

      const categoryName = result.current.getCategoryNameById(1);

      expect(categoryName).toBe("ציורים");
    });

    it("should return empty string for non-existing category ID", () => {
      const { result } = renderHook(() => useCategories("en"));

      const categoryName = result.current.getCategoryNameById(999);

      expect(categoryName).toBe("");
    });

    it("should return empty string when categories is null/undefined", () => {
      mockUseAxios.mockReturnValue(null);

      const { result } = renderHook(() => useCategories("en"));

      const categoryName = result.current.getCategoryNameById(1);

      expect(categoryName).toBe("");
    });

    it("should work with different category IDs", () => {
      const { result } = renderHook(() => useCategories("en"));

      expect(result.current.getCategoryNameById(1)).toBe("Paintings");
      expect(result.current.getCategoryNameById(2)).toBe("Sculptures");
      expect(result.current.getCategoryNameById(3)).toBe("Photography");
    });
  });

  it("should update when locale changes", () => {
    mockUseAxios.mockReturnValue(mockCategories);

    const { result, rerender } = renderHook(
      ({ locale }) => useCategories(locale),
      { initialProps: { locale: "en" } }
    );

    expect(result.current.getCategoryName(mockCategories[0])).toBe("Paintings");

    rerender({ locale: "he" });

    expect(result.current.getCategoryName(mockCategories[0])).toBe("ציורים");
  });
});
