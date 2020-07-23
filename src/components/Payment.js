import React, { useState } from "react";
import { withRouter } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { useStateValue } from "../StateProvider";
import { db, auth } from "../firebase";
import firebase from "firebase";

function Payment(props) {
  const [{ user, cart, shipping, totalprice }, dispatch] = useStateValue();
    const onSubmit = (token, address) => {
      if (cart.length > 0) {
      db.collection("shipping")
        .add({ ...shipping, uid: user.uid })
        .catch((error) => console.log(error));
      db.collection("orders")
        .add({ cart : [...cart], totalprice: totalprice, uid: user.uid })
        .catch((error) => console.log(error));      
    }

    dispatch({
      type : 'CART_EMPTY'
    })
    props.history.push('/order')
    
  }




  return (
    <div className="conatainer mt-5">
      <div className="row">
        <div className="col-sm-4 ml-auto mr-auto mt- mb-auto">
          <div className="card sign__card">
            <StripeCheckout
              stripeKey="pk_test_51H6sZ8KjEJ2iV1N8xxv6GlmCnmgwUABphoLdw0R8M1h21nrTh6SB0ePJcUjGxgJCu58yyiarKeLkuFnpCDkP2GNd00vaBW2DIL"
              token={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Payment);
