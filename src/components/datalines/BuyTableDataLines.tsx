"use client";
import React from "react";

import Link from "next/link";

import { ToastContainer } from "react-toastify";

import { SERVER_URL } from "@/utils/apiConstants";
import { UI_DIMENSIONS } from "@/utils/constants";

import FavouriteButton from "@/components/buttons/FavouriteButton";
import ShoppingCartButton from "@/components/buttons/ShoppingCartButton";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { Artwork } from "@/fetching/types";

import useQuantity from "@/hooks/useQuantity";

type BuyTableDataLinesProps = {
  line: Artwork;
  index: number;
  orderSummary?: boolean;
  recommendation?: boolean;
};

function BuyTableDataLines({
  line,
  index,
  orderSummary = false,
  recommendation = false,
}: BuyTableDataLinesProps) {
  const { loggedIn } = React.useContext(UserDataContext);

  const { quantity, setQuantity } = useQuantity(
    loggedIn,
    line.quantity,
    line.id
  );

  return (
    <tr key={index}>
      <td>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${SERVER_URL}/${line.thumbnail}`}
          width={UI_DIMENSIONS.THUMBNAIL_SIZE}
          height={UI_DIMENSIONS.THUMBNAIL_SIZE}
          style={{ objectFit: "cover" }}
          alt="place of thumbnail"
        />
      </td>
      <td>
        <Link href={`/artwork_page/${line.id}`}>
          <p>{line.title}</p>
        </Link>
      </td>
      <td className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}>
        <p>{line.artist_name}</p>
      </td>
      <td>
        <p>€{line.price}</p>
      </td>
      <td
        className={`text-center ${
          recommendation ? "d-none" : "d-none d-md-table-cell"
        }`}
      >
        <p>{quantity}</p>
      </td>
      <td className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}>
        <p>{line.tags && line.tags.map((tag) => tag.tname).join(", ")}</p>
      </td>
      <td className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}>
        <p>{line.cname}</p>
      </td>
      <td>
        {orderSummary ? (
          <p>€{quantity * line.price}</p>
        ) : (
          <div className="container">
            <span
              onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <ShoppingCartButton artwork_id={line.id} quantity={quantity} />
            </span>
            <FavouriteButton artwork_id={line.id} />
            <ToastContainer position="bottom-right" />
          </div>
        )}
      </td>
    </tr>
  );
}

export default BuyTableDataLines;
