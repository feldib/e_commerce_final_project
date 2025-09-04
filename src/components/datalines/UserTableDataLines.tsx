import React from "react";
import Link from "next/link";

type UserTableDataLinesProps = {
  line: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    phone_number: string;
  };
  index: number;
};

function UserTableDataLines(props: UserTableDataLinesProps) {
  return (
    <tr key={props.index}>
      <td>
        <Link href={`/admin/order_history/${props.line.id}`}>
          <p>
            {props.line.first_name}
            <span className="text-uppercase">{` ${props.line.last_name}`}</span>
          </p>
        </Link>
      </td>
      <td>
        <p>{props.line.email}</p>
      </td>
      <td className="d-none d-md-table-cell">
        <p>{props.line.address}</p>
      </td>
      <td className="d-none d-md-table-cell">
        <p>{props.line.phone_number}</p>
      </td>
    </tr>
  );
}

export default UserTableDataLines;
