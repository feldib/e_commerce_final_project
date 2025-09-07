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
  function makeDataLines(dataLines: Artwork[]): React.JSX.Element {
    return (
      <>
        {dataLines.map((line: Artwork, index: number) => {
          return (
            <AdminArtworkTableDatalines key={index} line={line} index={index} />
          );
        })}
      </>
    );
  }

  const dataLines = useLoading(props.dataLines, (dataLines) => {
    return presentData(dataLines as Artwork[], makeDataLines);
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
