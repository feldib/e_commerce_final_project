"use client";
import React from "react";

import Link from "next/link";

import { ToastContainer } from "react-toastify";

import { SERVER_URL, UI_DIMENSIONS } from "@/utils/constants";

import FeatureButton from "@/components/buttons/FeatureButton";
import RemoveArtworkButton from "@/components/buttons/RemoveArtworkButton";
import { useI18n } from "@/components/providers/I18nProvider";

import { Artwork } from "@/fetching/types";

import { useCategories } from "@/hooks/useCategories";

type AdminArtworkTableDatalinesProps = {
  line: Artwork;
  index: number;
};

function AdminArtworkTableDatalines({
  line,
  index,
}: AdminArtworkTableDatalinesProps) {
  const { t, locale } = useI18n();
  const { getCategoryNameById } = useCategories(locale);
  const [lineVisible, setLineVisible] = React.useState(true);

  const removeLineFromView = () => {
    setLineVisible(false);
  };

  return (
    <>
      {lineVisible && (
        <tr key={index}>
          <td>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${SERVER_URL}/${line.thumbnail}`}
              width={UI_DIMENSIONS.THUMBNAIL_SIZE}
              height={UI_DIMENSIONS.THUMBNAIL_SIZE}
              style={{ objectFit: "contain" }}
              alt={t("common.place_of_thumbnail")}
            />
          </td>
          <td>
            <Link href={`/admin/edit_artwork/${line.id}`}>
              <p>{line.title}</p>
            </Link>
          </td>
          <td>
            <p>{line.artist_name}</p>
          </td>
          <td className={"d-none d-md-table-cell"}>
            <p>€{line.price}</p>
          </td>
          <td className={"d-none d-md-table-cell"}>
            <p>{line.quantity}</p>
          </td>
          <td className={"d-none d-md-table-cell"}>
            <p>{line.tags && line.tags.map((tag) => tag.tname).join(", ")}</p>
          </td>
          <td className={"d-none d-md-table-cell"}>
            <p>{getCategoryNameById(line.category_id)}</p>
          </td>
          <td>
            <div className="container">
              <FeatureButton artwork_id={line.id} />

              <RemoveArtworkButton
                artwork_id={line.id}
                removeLineFromView={removeLineFromView}
              />

              <ToastContainer position="bottom-right" />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default AdminArtworkTableDatalines;
