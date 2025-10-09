"use client";
import React from "react";

import { Row } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork } from "@/fetching/types";

import AdminArtworkTableDatalines from "./AdminArtworkTableDatalines";

import { renderData } from "@/helpers/tableHelpers";
import useLoading from "@/hooks/useLoading";

type AdminArtworkTableProps = {
  dataLines: Artwork[];
};

function AdminArtworkTable({ dataLines }: AdminArtworkTableProps) {
  const { t } = useI18n();

  function makeRows(dataLinesGenerated: Artwork[]): React.JSX.Element {
    return (
      <>
        {dataLinesGenerated.map((line: Artwork, index: number) => {
          return (
            <AdminArtworkTableDatalines index={index} key={index} line={line} />
          );
        })}
      </>
    );
  }

  const dataLinesGenerated = useLoading(dataLines, (dataLines) => {
    return renderData(dataLines, makeRows, t("common.no_result.no_results"));
  });

  return (
    <Row className="text-center mx-auto">
      <table className="mb-3">
        <thead>
          <tr>
            <th aria-label={t("common.aria_labels.aria_label_thumbnail")}></th>
            <th>{t("common.fields.title")}</th>
            <th>{t("common.fields.artist")}</th>
            <th className={"d-none d-md-table-cell"}>
              {t("common.fields.price")}
            </th>
            <th className={"d-none d-md-table-cell"}>
              {t("common.fields.quantity")}
            </th>
            <th className={"d-none d-md-table-cell"}>
              {t("common.fields.tags")}
            </th>
            <th className={"d-none d-md-table-cell"}>
              {t("common.fields.categories")}
            </th>
            <th aria-label={t("common.aria_labels.aria_label_actions")}></th>
          </tr>
        </thead>

        <tbody>{dataLinesGenerated}</tbody>
      </table>
    </Row>
  );
}

export default AdminArtworkTable;
