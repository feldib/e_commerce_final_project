"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import FavouriteButton from "../buttons/FavouriteButton";
import {
  increaseShoppingListItemQuantity,
  decreaseShoppingListItemQuantity,
  removeFromShoppingList,
} from "@/fetching/fetching";
import {
  increaseLocalStorageShoppingCartQuantity,
  decreaseLocalStorageShoppingCartQuantity,
  removeLocalStorageShoppingCartQuantity,
} from "../../helpers/helpers";
import { UserDataContext } from "@/components/providers/UserDataProvider";
import { server_url } from "@/utils/api_constants";
import { Artwork } from "@/fetching/types";

type ShoppingCartDataLinesProps = {
  line: Artwork;
  index: number;
  changeCosts: (index: number, cost: number) => void;
  reccomendation?: boolean;
};

function ShoppingCartDataLines(props: ShoppingCartDataLinesProps) {
  const { loggedIn } = React.useContext(UserDataContext);

  const [quantity, setQuantity] = React.useState(props.line.quantity);

  React.useEffect(() => {
    props.changeCosts(props.index, props.line.price * quantity);
  }, [quantity]);

  return (
    <tr key={props.index}>
      <td>
        <img
          src={`${server_url}/${props.line.thumbnail}`}
          width="100"
          height="100"
          style={{ objectFit: "cover" }}
          alt="place of thumbnail"
        />
      </td>
      <td>
        <Link href={`/artwork_page/${props.line.id}`}>
          <p>{props.line.title}</p>
        </Link>
      </td>
      <td>
        <p>{props.line.artist_name}</p>
      </td>
      <td>
        <p>€{props.line.price * quantity}</p>
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
                  await decreaseShoppingListItemQuantity(props.line.id);
                } else {
                  decreaseLocalStorageShoppingCartQuantity(props.line.id);
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
                  await increaseShoppingListItemQuantity(props.line.id)
                    .then(() => {
                      toast.success("Item added to shopping cart", {
                        className: "toast-success",
                      });
                      setQuantity(quantity + 1);
                    })
                    .catch(() => {
                      toast.error("Item out of stock", {
                        className: "toast-error",
                      });
                    });
                } else {
                  try {
                    increaseLocalStorageShoppingCartQuantity(
                      props.line.id,
                      props.line.stored_amount - quantity
                    );
                    toast.success("Item added to shopping cart", {
                      className: "toast-success",
                    });
                    setQuantity(quantity + 1);
                  } catch {
                    toast.error("Item out of stock", {
                      className: "toast-error",
                    });
                  }
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ color: "red" }} />
            </p>
          </Col>
        </Row>
      </td>
      <td
        className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}
      >
        <p>
          {props.line.tags &&
            props.line.tags.map((tag) => tag.tname).join(", ")}
        </p>
      </td>
      <td
        className={`${props.reccomendation ? "d-none" : "d-none d-md-table-cell"}`}
      >
        <p>{props.line.cname}</p>
      </td>
      <td>
        <div className="container text-center">
          <Row>
            <Col>
              <FavouriteButton artwork_id={props.line.id} />
            </Col>
          </Row>

          <Row>
            <Col>
              <p
                style={{ cursor: "pointer" }}
                className="table-button"
                onClick={async () => {
                  if (loggedIn) {
                    await removeFromShoppingList(props.line.id);
                    setQuantity(0);
                  } else {
                    removeLocalStorageShoppingCartQuantity(props.line.id);
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
