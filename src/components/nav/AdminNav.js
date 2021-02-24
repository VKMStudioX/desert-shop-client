import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const AdminNav = () => {
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
  <nav >
    <ul className="grid__flex grid__flex--col grid__flex--dark">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">
          Product create
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">
          Products list
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Category create/update
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link">
          Sub Category create/update
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
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
export default AdminNav;
