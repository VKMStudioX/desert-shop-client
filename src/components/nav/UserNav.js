import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const UserNav = () => {
  let dispatch = useDispatch();
  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
  <nav>
    <ul className="grid__flex grid__flex--col grid__flex--dark">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link">
          History
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/wishlist" className="nav-link">
          Wishlist
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  </nav>
);

  }
export default UserNav;
