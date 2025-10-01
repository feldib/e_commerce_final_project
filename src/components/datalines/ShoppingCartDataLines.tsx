"use client";

import React from "react";

import Link from "next/link";

import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { SERVER_URL, UI_DIMENSIONS } from "@/utils/constants";
import {
  showCartItemAddedToast,
  showCartItemOutOfStockToast,
} from "@/utils/toastUtils";

import FavouriteButton from "@/components/buttons/FavouriteButton";
import { useI18n } from "@/components/providers/I18nProvider";
import { UserDataContext } from "@/components/providers/UserDataProvider";

import {
  decreaseShoppingListItemQuantity,
  increaseShoppingListItemQuantity,
  removeFromShoppingList,
} from "@/fetching/fetching";
import { Artwork } from "@/fetching/types";

import {
  decreaseLocalStorageShoppingCartQuantity,
  increaseLocalStorageShoppingCartQuantity,
  removeLocalStorageShoppingCartQuantity,
} from "@/helpers/helpers";
import { useCategories } from "@/hooks/useCategories";

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
  const { t, locale } = useI18n();
  const { getCategoryNameById } = useCategories(locale);
  const { loggedIn } = React.useContext(UserDataContext);

  const [quantity, setQuantity] = React.useState(line.quantity);

  React.useEffect(() => {
    changeCosts(index, line.price * quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return (
    <tr key={index}>
      <td>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${SERVER_URL}/${line.thumbnail}`}
          width={UI_DIMENSIONS.THUMBNAIL_SIZE}
          height={UI_DIMENSIONS.THUMBNAIL_SIZE}
          style={{ objectFit: "cover" }}
          alt={t("common.place_of_thumbnail")}
        />
      </td>
      <td>
        <Link href={`/artwork_page/${line.id}`}>
          <p>{line.title}</p>
        </Link>
      </td>
      <td>
        <p>{line.artist_name}</p>
      </td>
      <td>
        <p>€{line.price * quantity}</p>
      </td>
      <td className="text-center">
        <Row>
          <Col className="d-xl-none" sm={12}>
            <Col>
              <p>{quantity}</p>
            </Col>
          </Col>

          <Col>
            <p
              style={{ cursor: "pointer" }}
              className="table-button"
              onClick={async () => {
                //upon increase/decrease - go to the ancestor and update props quantity
                if (loggedIn) {
                  await decreaseShoppingListItemQuantity(line.id);
                } else {
                  decreaseLocalStorageShoppingCartQuantity(line.id);
                }

                if (quantity > 0) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faMinus} style={{ color: "red" }} />
            </p>
          </Col>

          <Col
            className="d-none d-xl-inline"
            xl={1}
            style={{
              marginRight: "10px",
            }}
          >
            <Col>
              <p>{quantity}</p>
            </Col>
          </Col>

          <Col>
            <p
              style={{ cursor: "pointer" }}
              className="table-button"
              onClick={async () => {
                if (loggedIn) {
                  try {
                    await increaseShoppingListItemQuantity(line.id);
                    showCartItemAddedToast(t);
                    setQuantity(quantity + 1);
                  } catch {
                    showCartItemOutOfStockToast(t);
                  }
                } else {
                  try {
                    increaseLocalStorageShoppingCartQuantity(
                      line.id,
                      line.stored_amount - quantity
                    );
                    showCartItemAddedToast(t);
                    setQuantity(quantity + 1);
                  } catch {
                    showCartItemOutOfStockToast(t);
                  }
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: "red" }} />
            </p>
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
              <p
                style={{ cursor: "pointer" }}
                className="table-button"
                onClick={async () => {
                  if (loggedIn) {
                    await removeFromShoppingList(line.id);
                    setQuantity(0);
                  } else {
                    removeLocalStorageShoppingCartQuantity(line.id);
                    setQuantity(0);
                  }
                }}
              >
                <FontAwesomeIcon icon={faX} style={{ color: "red" }} />
              </p>
            </Col>
          </Row>
          <ToastContainer position="bottom-right" />
        </div>
      </td>
    </tr>
  );
}

export default ShoppingCartDataLines;
