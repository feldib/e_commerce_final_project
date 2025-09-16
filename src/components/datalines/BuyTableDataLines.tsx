"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import FavouriteButton from "@/components/buttons/FavouriteButton";
import ShoppingCartButton from "@/components/buttons/ShoppingCartButton";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import { server_url } from "@/utils/api_constants";
import useQuantity from "@/hooks/useQuantity";
import { Artwork } from "@/fetching/types";

type BuyTableDataLinesProps = {
  line: Artwork;
  index: number;
  orderSummary?: boolean;
  reccomendation?: boolean;
};

function BuyTableDataLines({
  line,
  index,
  orderSummary = false,
  reccomendation = false,
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
          src={`${server_url}/${line.thumbnail}`}
          width="100"
          height="100"
          style={{ objectFit: "cover" }}
          alt="place of thumbnail"
        />
      </td>
      <td>
        <Link href={`/artwork_page/${line.id}`}>
          <p>{line.title}</p>
        </Link>
      </td>
      <td className={`${reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
        <p>{line.artist_name}</p>
      </td>
      <td>
        <p>€{line.price}</p>
      </td>
      <td
        className={`text-center ${
          reccomendation ? "d-none" : "d-none d-md-table-cell"
        }`}
      >
        <p>{quantity}</p>
      </td>
      <td className={`${reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
        <p>{line.tags && line.tags.map((tag) => tag.tname).join(", ")}</p>
      </td>
      <td className={`${reccomendation ? "d-none" : "d-none d-md-table-cell"}`}>
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
