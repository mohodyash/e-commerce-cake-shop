import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewProduct from "./components/ViewProduct";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Shipping from './components/Shipping';
import { db, auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import ImgUploder from './components/ImgUploader';
import Payment from './components/Payment';
import Order from './components/Order';
function App() {
  const [{  }, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log("user is log in", authUser.displayName);
        db.collection("users").onSnapshot((snapshot) => {
          const userSet = snapshot.docs.map((doc) => doc.data());
          for (const user of userSet) {
            if (user.username === authUser.displayName) {
               dispatch({
                  type : "USER_LOGIN",
                  payload : user
               })
               break;
            }
          }
        });
      } else {
        // console.log("user is log out");
      }
    });
    return () => {
      // perform some cleanup
      unsubscribe();
    };
  }, []);

  // console.log(user)
  return (
    <Router>
      <Switch>
        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/admin/product">
           <ImgUploder />
        </Route>
        <Route path="/viewproduct/:productid">
          <Header />
          <ViewProduct />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/shipping">
          <Header />
          <Shipping />
        </Route>
        <Route path="/order">
          <Header />
          <Order />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/">
         <Header />
         <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
