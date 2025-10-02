import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { getIsAdmin, getLoggedIn } from "@/fetching/fetching";

const redirectIfNotloggedIn = (router: AppRouterInstance) => {
  getLoggedIn().catch(() => {
    router.push("/login");
  });
};

const redirectIfNotAdmin = (router: AppRouterInstance) => {
  redirectIfNotloggedIn(router);
  getIsAdmin().catch(() => {
    router.push("/user");
  });
};

export { redirectIfNotAdmin, redirectIfNotloggedIn };
