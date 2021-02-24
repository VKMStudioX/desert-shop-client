import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    HomeOutlined,
    UserOutlined,
    UserAddOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
  } from "@ant-design/icons";

const Footer = () => {
    let { user } = useSelector((state) => ({ ...state }));

    return (
     <footer className="footer full-columns">
            <ul className="nav">
            <li className="nav__item"><Link to="/" className="btn-text"><HomeOutlined /> Home</Link></li>
      <li className="nav__item"><Link to="/shop" className="btn-text"><ShoppingOutlined /> Shop</Link></li>
      <li className="nav__item"><Link to="/cart" className="btn-text"><ShoppingCartOutlined /> Cart</Link></li>
      <li className="nav__item">
      {!user && (<Link to="/register" className="btn-text"><UserAddOutlined /> Register</Link>)}
      {!user && (<Link to="/login" className="btn-text"><UserOutlined /> Login</Link>)}
      {user && user.role === "subscriber" && (<Link to="/user/history" className="btn-text"><UserOutlined /> {user.email && user.email.split("@")[0]}</Link>)}
      {user && user.role === "admin" && (<Link to="/admin/dashboard" className="btn-text"><UserOutlined /> {user.email && user.email.split("@")[0]}</Link>)} 
          </li>
            </ul>
            <p className="copyright">
                &copy; Copyright 2021 by <strong>DesertShop.</strong> 
                <br/>Developed by <Link to={{ pathname: "http://vkmstudiox.github.io" }} target="_blank" className="btn-text" >VKM Studio (Krzysztof Meyer)</Link> <s>based on</s> inspired by some of Udemy front-end and back-end courses with totally re-builded front-end and added some features in backend for creative ideas how this shop should works. 
                <br/>Only the best stoner &amp; pagan folk music ever. 
                <br/>The Shop is only for digital access for music which are provided with credits.
                <br/>In the future, there will be a feature which you can recommend some nice albums for getting the new credits. 
            </p>
        </footer>
    )
}

export default Footer
