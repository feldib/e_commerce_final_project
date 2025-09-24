import React from "react";

import { Col,Row } from "react-bootstrap";

import UserTableDataLines from "@/components/datalines/UserTableDataLines";

import { User } from "@/fetching/types";

import { renderData } from "@/helpers/helpers";
import useLoading from "@/hooks/useLoading";

type UserTableProps = {
  users: User[];
};

function UserTable({ users }: UserTableProps) {
  function makeDataLines(dataLines: User[]) {
    return dataLines.map((line: User, index: number) => {
      return <UserTableDataLines key={index} line={line} index={index} />;
    });
  }

  const dataLines = useLoading(users, (dataLines) => {
    return renderData(dataLines, makeDataLines);
  });
  return (
    <Row className="text-center">
      {users.length !== 0 ? (
        <table className="mb-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th className="d-none d-md-table-cell">Address</th>
              <th className="d-none d-md-table-cell">Phone number</th>
            </tr>
          </thead>

          <tbody>{dataLines}</tbody>
        </table>
      ) : (
        <Col className="text-center">--- No users ---</Col>
      )}
    </Row>
  );
}

export default UserTable;
