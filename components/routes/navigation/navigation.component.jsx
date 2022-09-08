import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../../context/user.context";
import { CartContext } from "../../../context/cart.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import "./navigation.styles.scss";
/*
 * Outlet will mean than anything nested inside the Route of NAvigation will be below
 * the <h1>I am the navigation</h1>
 */

/*
 * We use fragment as top level component
 * it's usefull if you dont want to render a specific HTML element
 */
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  console.log("From the Navigation: ", currentUser);

  return (
    <Fragment>
      <div className="navigation">
        {/* Logo */}
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          {/* ####################### SHOP Button #######################*/}
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {/* ####################### Sign in/out Button #######################*/}
          {/* if the currentUser is populated set to SIGN OUT otherwise set to SIGN IN
           */}
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/sign-in">
              SIGN IN
            </Link>
          )}

          {/* ####################### Cart Icon Button #######################*/}
          <CartIcon/>
        </div>

        {isCartOpen && <CartDropdown/>}

      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
