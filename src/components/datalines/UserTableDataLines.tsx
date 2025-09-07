import React from "react";
import Link from "next/link";
import { User } from "@/fetching/types";

type UserTableDataLinesProps = {
  line: User;
  index: number;
};

function UserTableDataLines({ line, index }: UserTableDataLinesProps) {
  return (
    <tr key={index}>
      <td>
        <Link href={`/admin/order_history/${line.id}`}>
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
