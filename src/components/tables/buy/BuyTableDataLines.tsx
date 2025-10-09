"use client";
import React from "react";

import Link from "next/link";

import { ToastContainer } from "react-toastify";

import { SERVER_URL, UI_DIMENSIONS } from "@/utils/constants";

import FavouriteButton from "@/components/buttons/FavouriteButton";
import ShoppingCartButton from "@/components/buttons/ShoppingCartButton";
import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import { Artwork } from "@/fetching/types";

import { createQuantityDecreaseHandler } from "@/helpers/shoppingCartHelpers";
import { useCategories } from "@/hooks/useCategories";
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
  recommendation = false,
  orderSummary = false,
}: BuyTableDataLinesProps) {
  const { t, locale } = useI18n();
  const { getCategoryNameById } = useCategories(locale);
  const { loggedIn } = React.useContext(UserDataContext);
  const { quantity, setQuantity } = useQuantity(
    loggedIn,
    line.quantity,
    line.id
  );

  const handleQuantityDecrease = createQuantityDecreaseHandler(
    quantity,
    setQuantity
  );

  return (
    <tr key={index}>
      <td>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t("common.shop.place_of_thumbnail")}
          height={UI_DIMENSIONS.THUMBNAIL_SIZE}
          src={`${SERVER_URL}/${line.thumbnail}`}
          style={{ objectFit: "cover" }}
          width={UI_DIMENSIONS.THUMBNAIL_SIZE}
        />
      </td>
      <td>
        <Link
          aria-label={`${t("components.datalines.aria_label_view_artwork")} ${line.title}`}
          href={`/artwork_page/${line.id}`}
        >
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
        <p>{getCategoryNameById(line.category_id)}</p>
      </td>
      <td>
        {orderSummary ? (
          <p>€{quantity * line.price}</p>
        ) : (
          <div className="container">
            <button onClick={handleQuantityDecrease}>
              <ShoppingCartButton artwork_id={line.id} quantity={quantity} />
            </button>
            <FavouriteButton artwork_id={line.id} />
            <ToastContainer position="bottom-right" />
          </div>
        )}
      </td>
    </tr>
  );
}

export default BuyTableDataLines;
