import * as fetchingModule from "@/fetching/auth";

import { redirectIfNotAdmin, redirectIfNotloggedIn } from "../authHelpers";

// Mock the fetching module
jest.mock("@/fetching/auth", () => ({
  getLoggedIn: jest.fn(),
  getIsAdmin: jest.fn(),
}));

// Mock router
const mockRouter = {
  push: jest.fn(),
} as unknown as Parameters<typeof redirectIfNotloggedIn>[0];

describe("authHelpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("redirectIfNotloggedIn", () => {
    it("should not redirect when user is logged in", async () => {
      (fetchingModule.getLoggedIn as jest.Mock).mockResolvedValue({
        data: { user: { id: 1 } },
      });

      redirectIfNotloggedIn(mockRouter);

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(fetchingModule.getLoggedIn).toHaveBeenCalled();
      expect(mockRouter.push).not.toHaveBeenCalled();
    });

    it("should redirect to login when user is not logged in", async () => {
      (fetchingModule.getLoggedIn as jest.Mock).mockRejectedValue(
        new Error("Not logged in")
      );

      redirectIfNotloggedIn(mockRouter);

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(fetchingModule.getLoggedIn).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });
  });

  describe("redirectIfNotAdmin", () => {
    it("should not redirect when user is admin", async () => {
      (fetchingModule.getLoggedIn as jest.Mock).mockResolvedValue({
        data: { user: { id: 1 } },
      });
      (fetchingModule.getIsAdmin as jest.Mock).mockResolvedValue({
        data: { isAdmin: true },
      });

      redirectIfNotAdmin(mockRouter);

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(fetchingModule.getLoggedIn).toHaveBeenCalled();
      expect(fetchingModule.getIsAdmin).toHaveBeenCalled();
      expect(mockRouter.push).not.toHaveBeenCalled();
    });

    it("should redirect to user page when logged in but not admin", async () => {
      (fetchingModule.getLoggedIn as jest.Mock).mockResolvedValue({
        data: { user: { id: 1 } },
      });
      (fetchingModule.getIsAdmin as jest.Mock).mockRejectedValue(
        new Error("Not admin")
      );

      redirectIfNotAdmin(mockRouter);

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(fetchingModule.getLoggedIn).toHaveBeenCalled();
      expect(fetchingModule.getIsAdmin).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith("/user");
    });

    it("should redirect to login when not logged in", async () => {
      (fetchingModule.getLoggedIn as jest.Mock).mockRejectedValue(
        new Error("Not logged in")
      );

      redirectIfNotAdmin(mockRouter);

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(fetchingModule.getLoggedIn).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });
  });
});
