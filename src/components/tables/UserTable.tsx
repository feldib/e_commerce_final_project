"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import UserTableDataLines from "@/components/datalines/UserTableDataLines";
import { useI18n } from "@/components/providers/I18nProvider";

import { User } from "@/fetching/types";

import { renderData } from "@/helpers/helpers";
import useLoading from "@/hooks/useLoading";

type UserTableProps = {
  users: User[];
};

function UserTable({ users }: UserTableProps) {
  const { t } = useI18n();

  function makeRows(dataLines: User[]): React.JSX.Element {
    return (
      <>
        {dataLines.map((line: User, index: number) => {
          return <UserTableDataLines key={index} line={line} index={index} />;
        })}
      </>
    );
  }

  const dataLines = useLoading(users, (dataLines): React.JSX.Element => {
    return renderData(dataLines, makeRows, t("common.no_results"));
  });

  return (
    <Row className="text-center">
      {users.length !== 0 ? (
        <table className="mb-3">
          <thead>
            <tr>
              <th className="d-none d-sm-table-cell">{t("common.name")}</th>
              <th className="d-none d-md-table-cell">{t("common.email")}</th>
              <th className="d-none d-md-table-cell">{t("common.address")}</th>
              <th className="d-none d-md-table-cell">
                {t("common.phone_number")}
              </th>
            </tr>
          </thead>

          <tbody>{dataLines}</tbody>
        </table>
      ) : (
        <Col className="text-center">{t("common.no_users")}</Col>
      )}
    </Row>
  );
}

export default UserTable;
