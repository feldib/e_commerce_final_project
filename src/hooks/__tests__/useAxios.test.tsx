import { renderHook, waitFor } from "@testing-library/react";

import axiosConfigured from "@/utils/axiosConfigured";

import useAxios from "../useAxios";

// Mock axios
jest.mock("@/utils/axiosConfigured", () => ({
  get: jest.fn(),
}));

// Mock constants
jest.mock("@/utils/constants", () => ({
  SERVER_URL: "http://localhost:3001/",
}));

const mockAxios = axiosConfigured as jest.Mocked<typeof axiosConfigured>;

describe("useAxios", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return undefined initially", () => {
    mockAxios.get.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { result } = renderHook(() => useAxios("/test"));

    expect(result.current).toBeUndefined();
  });

  it("should fetch data successfully and return it", async () => {
    const mockData = { id: 1, name: "Test Data" };
    mockAxios.get.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useAxios("/test"));

    await waitFor(() => {
      expect(result.current).toEqual(mockData);
    });

    expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:3001//test");
  });

  it("should return false on fetch error", async () => {
    mockAxios.get.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useAxios("/error"));

    await waitFor(() => {
      expect(result.current).toBe(false);
    });

    expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:3001//error");
  });

  it("should construct correct URL with different endpoints", async () => {
    const mockData = { users: [] };
    mockAxios.get.mockResolvedValue({ data: mockData });

    renderHook(() => useAxios("/users"));

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith(
        "http://localhost:3001//users"
      );
    });
  });

  it("should handle different types of response data", async () => {
    const mockStringData = "test string";
    mockAxios.get.mockResolvedValue({ data: mockStringData });

    const { result } = renderHook(() => useAxios("/string"));

    await waitFor(() => {
      expect(result.current).toBe(mockStringData);
    });
  });

  it("should handle array response data", async () => {
    const mockArrayData = [1, 2, 3, 4, 5];
    mockAxios.get.mockResolvedValue({ data: mockArrayData });

    const { result } = renderHook(() => useAxios("/array"));

    await waitFor(() => {
      expect(result.current).toEqual(mockArrayData);
    });
  });

  it("should handle null response data", async () => {
    mockAxios.get.mockResolvedValue({ data: null });

    const { result } = renderHook(() => useAxios("/null"));

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  it("should handle empty object response", async () => {
    const mockEmptyData = {};
    mockAxios.get.mockResolvedValue({ data: mockEmptyData });

    const { result } = renderHook(() => useAxios("/empty"));

    await waitFor(() => {
      expect(result.current).toEqual(mockEmptyData);
    });
  });

  it("should only make one request per hook instance", async () => {
    const mockData = { id: 1 };
    mockAxios.get.mockResolvedValue({ data: mockData });

    renderHook(() => useAxios("/single"));

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
  });
});
