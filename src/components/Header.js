import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

import { Nav, Navbar, Form } from "react-bootstrap";

function Header() {
  const [{ cart, user }, dispatch] = useStateValue();

  console.log(user);

  const signout = () => {
    // console.log("signout");
    dispatch({
      type: "USER_LOGOUT",
    });
    auth.signOut();
  };

  return (
    <Navbar fixed="top" expand="lg" className="header" variant="dark">
      <Navbar.Brand href="">
        <Link to="/">
          <span className="header__logo">Cake-Shop</span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline>
          <div className="header__search">
            <input type="text" className="header__searchInput" />
            <SearchIcon className="header__searchIcon " />
          </div>
        </Form>
        <Nav className="ml-auto">
          <Nav.Link href="">
            <div className="header__nav">
              <Link to="/" className="header__link">
                <div className="header__option">
                  <span className="header__optionLineOne">
                    {" "}
                    <span className="fas fa-clock"></span> Delivery in
                  </span>
                  <span className="header__optionLineTwo">2 Hourse</span>
                </div>
              </Link>
            </div>
          </Nav.Link>
          <Nav.Link href="">
            <div className="header__nav">
              {user ? (
                <div className="header__link">
                  <div className="header__option">
                    <span className="header__optionLineOne">
                      {" "}
                      <i className="fas fa-user"></i> {user.username}
                    </span>
                    <span
                      className="header__optionLineTwo"
                      style={{ cursor: "pointer" }}
                      onClick={signout}
                    >
                      Sign out
                    </span>
                  </div>
                </div>
              ) : (
                <Link to="/signin" className="header__link">
                  <div className="header__option">
                    <span className="header__optionLineOne">
                      Hello <i className="fas fa-user"></i>
                    </span>
                    <span className="header__optionLineTwo">Sign in</span>
                  </div>
                </Link>
              )}
            </div>
          </Nav.Link>

          <Nav.Link href="">
            <div className="header__nav">
              <Link to="/order" className="header__link">
                <div className="header__option">
                  <span className="header__optionLineOne">
                    <i className="fas fa-map-marker-alt"></i>Delivery
                  </span>
                  <span className="header__optionLineTwo">&Orders</span>
                </div>
              </Link>
            </div>
          </Nav.Link>

          <Nav.Link href="">
            <div className="header__nav">
              <Link to="/checkout" className="header__link">
                <div className="header__option">
                  <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge
                      badgeContent={cart.length !== 0 ? cart.length : 0}
                      color="secondary"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </div>
              </Link>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
