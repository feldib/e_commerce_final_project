"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import RemoveArtworkButton from "../buttons/RemoveArtworkButton";
import FeatureButton from "../buttons/FeatureButton";
import { server_url } from "../../utils/api_constants";
import { Artwork } from "@/fetching/types";

type AdminArtworkTableDatalinesProps = {
  line: Artwork;
  index: number;
};

function AdminArtworkTableDatalines(props: AdminArtworkTableDatalinesProps) {
  const [lineVisible, setLineVisible] = React.useState(true);

  const removeLineFromView = () => {
    setLineVisible(false);
  };

  return (
    <>
      {lineVisible && (
        <tr key={props.index}>
          <td>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${server_url}/${props.line.thumbnail}`}
              width="100"
              height="100"
              style={{ objectFit: "contain" }}
              alt="place of thumbnail"
            />
          </td>
          <td>
            <Link href={`/admin/edit_artwork/${props.line.id}`}>
              <p>{props.line.title}</p>
            </Link>
          </td>
          <td>
            <p>{props.line.artist_name}</p>
          </td>
          <td className={"d-none d-md-table-cell"}>
            <p>€{props.line.price}</p>
          </td>
          <td className={"d-none d-md-table-cell"}>
            <p>{props.line.quantity}</p>
          </td>
          <td className={"d-none d-md-table-cell"}>
            <p>
              {props.line.tags &&
                props.line.tags.map((tag) => tag.tname).join(", ")}
            </p>
          </td>
          <td className={"d-none d-md-table-cell"}>
            <p>{props.line.cname}</p>
          </td>
          <td>
            <div className="container">
              <FeatureButton artwork_id={props.line.id} />

              <RemoveArtworkButton
                artwork_id={props.line.id}
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
