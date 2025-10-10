import { showIncorrectDataToast } from "@/utils/toastUtils";

export const createHandleSubmitClick = (t: (key: string) => string) => {
  return (errors: Record<string, unknown>) => {
    if (Object.keys(errors).length) {
      showIncorrectDataToast(t);
    }
  };
};
