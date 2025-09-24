import React from "react";

import { Row } from "react-bootstrap";

import AdminArtworkTableDatalines from "@/components/datalines/AdminArtworkTableDatalines";

import { Artwork } from "@/fetching/types";

import { renderData } from "@/helpers/helpers";
import useLoading from "@/hooks/useLoading";

type AdminArtworkTableProps = {
  dataLines: Artwork[];
};

function AdminArtworkTable({ dataLines }: AdminArtworkTableProps) {
  function makeDataLines(dataLinesGenerated: Artwork[]): React.JSX.Element {
    return (
      <>
        {dataLinesGenerated.map((line: Artwork, index: number) => {
          return (
            <AdminArtworkTableDatalines key={index} line={line} index={index} />
          );
        })}
      </>
    );
  }

  const dataLinesGenerated = useLoading(dataLines, (dataLines) => {
    return renderData(dataLines, makeDataLines);
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

        <tbody>{dataLinesGenerated}</tbody>
      </table>
    </Row>
  );
}

export default AdminArtworkTable;
