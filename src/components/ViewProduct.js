import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./ViewProduct.css";
import { db } from "../firebase";
import Loader from "react-loader-spinner";
import {useStateValue} from '../StateProvider';


function ViewProduct(props) {

  const [{isAllredyPresentInCart}, dispatch] = useStateValue();
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(props.match.params.productid);
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    var docRef = db.collection("products").doc(productId);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setProduct({
            id: doc.id,
            ...doc.data(),
          });
          setIsLoding(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [productId]);

   const addToCart = () => {
     dispatch({
       type : 'ADD_TO_CART',
       payload : product
     })
     props.history.push('/checkout');
   } 
   
  if (isLoding)
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
  else
    return (
      <div className="container" style={{marginTop:'100px'}}>
        <div className="card viewcard mt-5">
          <div className="path text-uppercase">
            home / cakes / <a>{product.id}</a>
          </div>
          <div className="row">
            <div className="col-md-6 text-center align-self-center">
              <div className="row">
                <div className="col-md-12">
                  <img
                    src={product.imgurls[0]}
                    alt="img"
                    className="img-fluid viewimg"
                  ></img>
                </div>
              </div>
              <div className="row smallimg">
                {product.imgurls.map((img, index) => {
                  if (index !== 0)
                    return (
                      <div key={index} className="col-md-3">
                        <img
                          src={img}
                          alt="img"
                          className="img-fluid viewimg"
                        ></img>
                      </div>
                    );
                })}
              </div>
            </div>
            <div className="col-md-6 info">
              <div className="row title mb-2">
                <div className="col-md-10 col-12">
                  <h1>{product.name}</h1>
                  <p>
                    {product.description}
                  </p>
                  <div>
                    <span className="fas fa-star rating"></span>
                    <span className="fas fa-star rating"></span>
                    <span className="fas fa-star rating"></span>
                    <span className="fas fa-star rating"></span>
                    <span className="fas fa-star-half-alt rating"></span>
                    <span className="reviews">{product.reviews} Reviews</span>
                  </div>
                  <div className="button">
                    <button onClick={addToCart} disabled={isAllredyPresentInCart} className="button__add">Add To cart</button>
                    {/* <button className="button__buy">Buy Now</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default withRouter(ViewProduct);
