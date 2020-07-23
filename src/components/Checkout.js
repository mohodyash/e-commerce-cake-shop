import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import "./Checkout.css";
import { useStateValue } from "../StateProvider";

function ChackOut(props) {
  const [{ cart, totalprice }, dispatch] = useStateValue();
  const [isDecreaseActive, setIsDecreaseActive] = useState(true);

  let total = 0;

  const increaseQuantity = (product) => {
    dispatch({
      type: "INCREASE_PRODUCT_QUANTITY",
      payload: {
        id: product.id,
        quantity: 1,
        price: product.price,
      },
    });
  };

  const decreaseQuantity = (product) => {
    dispatch({
      type: "DECREASE_PRODUCT_QUANTITY",
      payload: {
        id: product.id,
        quantity: 1,
        price: product.price,
      },
    });
  };
  const removeItem = (product) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        id: product.id,
      },
    });
  };

  return (
    <div>
      <Container className="checkout__container">
        <Row className="mt-5">
          <Col>
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        className="checkout__img"
                        height="150"
                        width="150"
                        src={product.imgurls[0]}
                        alt={"img"}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>
                      {product.price} <i className="fas fa-rupee-sign"></i>
                    </td>
                    <td colSpan="2">
                      <button
                        disabled={product.quantity <= 1}
                        onClick={() => decreaseQuantity(product)}
                        className="checkout__button"
                      >
                        -
                      </button>{" "}
                      {product.quantity}
                      <button
                        onClick={() => increaseQuantity(product)}
                        className="checkout__button"
                      >
                        +
                      </button>
                    </td>
                    <td>
                      {product.total} <i className="fas fa-rupee-sign"></i>
                    </td>
                    <td>
                      <i
                        onClick={(e) => removeItem(product)}
                        className="fas fa-times delete"
                      ></i>
                    </td>
                  </tr>
                ))}
                {cart.length > 0 && (
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td colspan="2">
                        Total Price : {totalprice}{" "}
                        <i className="fas fa-rupee-sign"></i>
                        <button
                          onClick={(e) => {
                            props.history.push("/shipping");
                          }}
                          className="checkout__button__buy"
                        >
                          Buy Now
                        </button>
                      </td>
                      <td></td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default withRouter(ChackOut);
