import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../../context/user.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
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
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("From the Navigation: ", currentUser);

  const signOutHandler = async () => {
    const respone = await signOutUser();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className="navigation">
        {/* Logo */}
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          {/* SHOP Button */}
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {/* SIGN IN/OUT Button
           * if the currentUser is populated set to SIGN OUT otherwise set to SIGN IN
           */}
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/sign-in">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
