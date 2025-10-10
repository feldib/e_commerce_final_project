"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { User } from "@/fetching/types";

import useUserTable from "./hooks/useUserTable";
import UserTableDataLines from "./UserTableDataLines";

type UserTableProps = {
  users: User[];
};

function UserTable({ users }: UserTableProps) {
  function makeRows(dataLines: User[]): React.JSX.Element {
    return (
      <>
        {dataLines.map((line: User, index: number) => {
          return <UserTableDataLines index={index} key={index} line={line} />;
        })}
      </>
    );
  }

  const { dataLines, t } = useUserTable({
    users,
    makeRows,
  });

  return (
    <Row className="text-center">
      {users.length !== 0 ? (
        <table className="mb-3">
          <thead>
            <tr>
              <th className="d-none d-sm-table-cell">
                {t("common.fields.name")}
              </th>
              <th className="d-none d-md-table-cell">
                {t("common.fields.email")}
              </th>
              <th className="d-none d-md-table-cell">
                {t("common.fields.address")}
              </th>
              <th className="d-none d-md-table-cell">
                {t("common.fields.phone_number")}
              </th>
            </tr>
          </thead>

          <tbody>{dataLines}</tbody>
        </table>
      ) : (
        <Col className="text-center">{t("common.no_result.no_users")}</Col>
      )}
    </Row>
  );
}

export default UserTable;
