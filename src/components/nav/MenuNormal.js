import React, { useState } from 'react'
import { Menu, Badge } from "antd";
import {
  HomeOutlined,
  MenuOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu, Item } = Menu;

const MenuMornal = ({user}) => {
    const [current, setCurrent] = useState("home");


    const handleClick = (e) => {
      setCurrent(e.key);
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="navigation__list">
        <Item key="home"  className="navigation__item">
          <Link to="/" className="navigation__link"> <HomeOutlined />Home</Link>
        </Item>
  
        <Item key="shop" className="navigation__item">
          <Link to="/shop" className="navigation__link"><ShoppingOutlined />Shop</Link>
        </Item>
  
        <Item key="cart" className="navigation__item">
          <Link to="/cart" className="navigation__link"><ShoppingCartOutlined />Cart
          </Link>
        </Item>
  
        {!user && (
          <Item key="register" className="navigation__item">
            <Link to="/register" className="navigation__link"><UserAddOutlined />Register</Link>
          </Item>
        )}
  
        {!user && (
          <Item key="login" className="navigation__item">
            <Link to="/login" className="navigation__link"><UserOutlined />Login</Link>
          </Item>
        )}
  
        {user && user.role === "subscriber" && (
          <Item className="navigation__item">
            <Link to="/user/history" className="navigation__link"><UserOutlined />{user.email && user.email.split("@")[0]}</Link>
          </Item>
        )}
  
        {user && user.role === "admin" && (
          <Item className="navigation__item">
            <Link to="/admin/dashboard" className="navigation__link"><UserOutlined />{user.email && user.email.split("@")[0]}</Link>
          </Item>
        )} 
      </Menu>
    )
}

export default MenuMornal
