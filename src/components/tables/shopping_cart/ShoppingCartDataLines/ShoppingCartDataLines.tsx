"use client";

import React from "react";

import Link from "next/link";

import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { SERVER_URL, UI_DIMENSIONS } from "@/utils/constants";

import FavouriteButton from "@/components/buttons/FavouriteButton/FavouriteButton";

import { Artwork } from "@/fetching/types";

import useShoppingCartDataLines from "./useShoppingCartDataLines";

type ShoppingCartDataLinesProps = {
  line: Artwork;
  index: number;
  changeCosts: (index: number, cost: number) => void;
  recommendation?: boolean;
};

function ShoppingCartDataLines({
  line,
  index,
  changeCosts,
  recommendation = false,
}: ShoppingCartDataLinesProps) {
  const {
    getCategoryNameById,
    quantity,
    handleDecrease,
    handleIncrease,
    handleRemove,
    t,
  } = useShoppingCartDataLines({
    line,
    index,
    changeCosts,
  });

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
      <td>
        <p>{line.artist_name}</p>
      </td>
      <td>
        <p>€{line.price * quantity}</p>
      </td>
      <td
        aria-label={t("components.shopping_cart.aria_label_quantity_controls")}
        className="text-center"
      >
        <Row>
          <Col className="d-xl-none" sm={12}>
            <Col>
              <p>{quantity}</p>
            </Col>
          </Col>

          <Col>
            <button
              aria-label={t(
                "components.shopping_cart.aria_label_decrease_quantity"
              )}
              className="table-button"
              onClick={handleDecrease}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faMinus} style={{ color: "red" }} />
            </button>
          </Col>

          <Col
            className="d-none d-xl-inline"
            style={{
              marginRight: "10px",
            }}
            xl={1}
          >
            <Col>
              <p>{quantity}</p>
            </Col>
          </Col>

          <Col>
            <button
              aria-label={t(
                "components.shopping_cart.aria_label_increase_quantity"
              )}
              className="table-button"
              onClick={handleIncrease}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: "red" }} />
            </button>
          </Col>
        </Row>
      </td>
      <td className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}>
        <p>{line.tags && line.tags.map((tag) => tag.tname).join(", ")}</p>
      </td>
      <td className={`${recommendation ? "d-none" : "d-none d-md-table-cell"}`}>
        <p>{getCategoryNameById(line.category_id)}</p>
      </td>
      <td>
        <div className="container text-center">
          <Row>
            <Col>
              <FavouriteButton artwork_id={line.id} />
            </Col>
          </Row>

          <Row>
            <Col>
              <button
                aria-label={t(
                  "components.shopping_cart.aria_label_remove_item_from_cart"
                )}
                className="table-button"
                onClick={handleRemove}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faX} style={{ color: "red" }} />
              </button>
            </Col>
          </Row>
          <ToastContainer position="bottom-right" />
        </div>
      </td>
    </tr>
  );
}

export default ShoppingCartDataLines;
