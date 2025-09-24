"use client";
import React from "react";

import { Col, Row } from "react-bootstrap";

import { admin_url } from "@/utils/apiConstants";

import UserTable from "@/components/tables/UserTable";

import { User } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";
import useLoading from "@/hooks/useLoading";

function Users() {
  const users = useAxios(`/${admin_url}/users`) as User[];
  const usersRepresented = useLoading(users, (users) => {
    return <UserTable users={users} />;
  });
  return (
    <Col>
      <Row className="floating-element">{usersRepresented}</Row>
    </Col>
  );
}

export default Users;
