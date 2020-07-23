import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";

function Order() {
  const [orders, setOrders] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [loader, setLoder] = useState(true);

  useEffect(() => {
    if (user) {
      db.collection("orders")
        .where("uid", "==", user.uid)
        .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
              orders.push(change.doc.data());
            }
          });
          setLoder(false);
        });
    }
  });

  if (loader)
    return (
      <div className="">
        <Loader
          className="product__loader"
          type="Circles"
          color="#070200"
          height={80}
          width={80}
        />
      </div>
    );
  else {
    return (
      <div>
        {orders &&
          orders.map((order) => (
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
                      {order.cart?.map((product, index) => (
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
                            {product.price}{" "}
                            <i className="fas fa-rupee-sign"></i>
                          </td>
                          <td>{product.quantity}</td>
                          <td>
                            {product.total}{" "}
                            <i className="fas fa-rupee-sign"></i>
                          </td>
                          <td></td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="6">total Price : {order.totalprice} Paid</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          ))}
      </div>
    );
  }
}

export default Order;
