"use client";

import React from "react";

import { useI18n } from "@/components/providers/I18nProvider";

import { User } from "@/fetching/types";

import { renderData } from "@/helpers/tableHelpers";
import useLoading from "@/hooks/useLoading";

type UseUserTableProps = {
  users: User[];
  makeRows: (dataLines: User[]) => React.JSX.Element;
};

type UseUserTableReturn = {
  dataLines: React.ReactNode;
  t: (key: string) => string;
};

function useUserTable({
  users,
  makeRows,
}: UseUserTableProps): UseUserTableReturn {
  const { t } = useI18n();

  const dataLines = useLoading(users, (dataLines): React.JSX.Element => {
    return renderData(dataLines, makeRows, t("common.no_result.no_results"));
  });

  return {
    dataLines,
    t,
  };
}

export default useUserTable;
