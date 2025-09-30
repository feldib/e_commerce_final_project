"use client";
import React from "react";

import { Row } from "react-bootstrap";

import AdminArtworkTableDatalines from "@/components/datalines/AdminArtworkTableDatalines";
import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork } from "@/fetching/types";

import { renderData } from "@/helpers/helpers";
import useLoading from "@/hooks/useLoading";

type AdminArtworkTableProps = {
  dataLines: Artwork[];
};

function AdminArtworkTable({ dataLines }: AdminArtworkTableProps) {
  const { t } = useI18n();

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
            <th>{t("common.title")}</th>
            <th>{t("common.artist")}</th>
            <th className={"d-none d-md-table-cell"}>{t("common.price")}</th>
            <th className={"d-none d-md-table-cell"}>{t("common.quantity")}</th>
            <th className={"d-none d-md-table-cell"}>{t("common.tags")}</th>
            <th className={"d-none d-md-table-cell"}>
              {t("common.categories")}
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>{dataLinesGenerated}</tbody>
      </table>
    </Row>
  );
}

export default AdminArtworkTable;
