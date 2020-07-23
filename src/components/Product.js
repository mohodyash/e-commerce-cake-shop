import React, { useState, useEffect } from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider";
import { withRouter } from "react-router";
function Product(props) {
  const { products } = props;

  const [{}, dispatch] = useStateValue();

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product
    });
    props.history.push('/checkout');
  };

  const viewProduct = (id) => {
    props.history.push("/viewproduct/" + id);
  };

  return (
    <div className="row m-4">
      {products &&
        products.map((product) => (
          <div
            key={product.id}
            className="col-sm-6 col-md-4  col-lg-3"
            style={{ color: "saddlebrown" }}
          >
            <div className="card shadow bg-white rounded ">
              <div className="card-body">
                <img
                  onClick={(e) => viewProduct(product.id)}
                  className="product__img img-fluid"
                  src={product.imgurls[0]}
                  alt="Card image cap"
                />
                <h4 className="product__price">
                  {product.name}
                </h4>
                <h4 className="product__price">
                  {product.price} <i className="fas fa-rupee-sign"></i>
                  <div>
                    <span className="fas fa-star rating"></span>
                    <span className="fas fa-star rating"></span>
                    <span className="fas fa-star rating"></span>
                    <span className="fas fa-star rating"></span>
                    <span className="fas fa-star-half-alt rating"></span>
                  </div>
                  <div>
                    <span className="reviews">{product.reviews} Reviews</span>
                  </div>
                </h4>

                <button
                  onClick={(e) => addToCart(product)}
                  className="product__button"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default withRouter(Product);
