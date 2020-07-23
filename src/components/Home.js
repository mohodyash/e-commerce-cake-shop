import React, { useState, useEffect } from "react";
import "./Home.css";
import Banner from "./Banner";
import Product from "./Product";
import { db } from "../firebase";

function Home() {

  const [products, setProducts] = useState(null);

  // getting product from db
  useEffect(() => {
    db.collection("products").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    });
  }, []);

  return (
    <div className="home">
      <Banner />
      <div className="home__heading">
        <h2>Cake-Shop</h2>
      </div>
      <Product products={products} />
    </div>
  );
}

export default Home;
