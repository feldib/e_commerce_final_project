"use client";

import React from "react";

import Link from "next/link";

import { useI18n } from "@/components/providers/I18nProvider";

import { User } from "@/fetching/types";

type UserTableDataLinesProps = {
  line: User;
  index: number;
};

function UserTableDataLines({ line, index }: UserTableDataLinesProps) {
  const { t } = useI18n();

  return (
    <tr key={index}>
      <td>
        <Link
          aria-label={`${t("components.datalines.aria_label_view_user")} ${line.first_name} ${line.last_name}`}
          href={`/admin/order_history/${line.id}`}
        >
          <p>
            {line.first_name}
            <span className="text-uppercase">{` ${line.last_name}`}</span>
          </p>
        </Link>
      </td>
      <td>
        <p>{line.email}</p>
      </td>
      <td className="d-none d-md-table-cell">
        <p>{line.address}</p>
      </td>
      <td className="d-none d-md-table-cell">
        <p>{line.phone_number}</p>
      </td>
    </tr>
  );
}

export default UserTableDataLines;
