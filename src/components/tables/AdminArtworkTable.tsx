import React from "react";
import { Row } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import AdminArtworkTableDatalines from "../datalines/AdminArtworkTableDatalines";
import { presentData } from "../../helpers/helpers";
import { Artwork } from "@/fetching/types";

type AdminArtworkTableProps = {
  dataLines: Artwork[];
};

function AdminArtworkTable(props: AdminArtworkTableProps) {
  function makeDataLines(dataLines: any) {
    return dataLines.map((line: any, index: number) => {
      return <AdminArtworkTableDatalines line={line} index={index} />;
    });
  }

  const dataLines = useLoading(props.dataLines, (dataLines) => {
    return presentData(dataLines, makeDataLines);
  });

  return (
    <Row className="text-center mx-auto">
      <table className="mb-3">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Artist</th>
            <th className={"d-none d-md-table-cell"}>Price</th>
            <th className={"d-none d-md-table-cell"}>Quantity</th>
            <th className={"d-none d-md-table-cell"}>Tags</th>
            <th className={"d-none d-md-table-cell"}>Categories</th>
            <th></th>
          </tr>
        </thead>

        <tbody>{dataLines}</tbody>
      </table>
    </Row>
  );
}

export default AdminArtworkTable;
