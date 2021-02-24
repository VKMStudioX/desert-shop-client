import React, { useState } from 'react'
import {
    HomeOutlined,
    MenuOutlined,
    CloseOutlined,
    UserOutlined,
    UserAddOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
  } from "@ant-design/icons";
  import { Link } from "react-router-dom";

const MenuMobile = ({user}) => {
    const [navVisible, setNavVisible] = useState(false)
    const [current, setCurrent] = useState("")

    const handleNavVisible = () => {
       if (navVisible) {
        const timer = setTimeout(() => {
            setNavVisible(!navVisible)
          }, 750);
          return () => clearTimeout(timer);
        } else {
            setNavVisible(!navVisible)
        }

    }

    const activeClass = "navigation__mobile__link navigation__mobile__link--active"
    const notActiveClass = "navigation__mobile__link"

    return (
        <div className="navigation__mobile">

            <button className="navigation__mobile__button" onClick={handleNavVisible}>
                {!navVisible ? <MenuOutlined /> : <CloseOutlined />}
            </button>

            <nav 
            className={navVisible 
            ? "navigation__mobile__nav navigation__mobile__nav--visible" 
            : "navigation__mobile__nav navigation__mobile__nav--hidden"
            }>
                <ul className="navigation__mobile__list">
                    <li className="navigation__mobile__item">
                        <Link 
                         to="/" 
                         className={current === "home" 
                        ? activeClass 
                        : notActiveClass}  
                        onClick={() =>{handleNavVisible(); setCurrent("home");}}
                        >
                         <HomeOutlined /> Home
                        </Link>
                    </li>
                    <li className="navigation__mobile__item">
                        <Link 
                         to="/shop" 
                         className={current === "shop" 
                         ? activeClass 
                         : notActiveClass} 
                         onClick={() =>{handleNavVisible(); setCurrent("shop");}}
                        >
                         <ShoppingOutlined /> Shop
                        </Link>
                    </li>
                    <li className="navigation__mobile__item">
                        <Link to="/cart" 
                        className={current === "cart" 
                        ? activeClass 
                        : notActiveClass} 
                        onClick={() =>{handleNavVisible(); setCurrent("cart");}}
                        >
                         <ShoppingCartOutlined /> Cart
                        </Link>
                    </li>
                    {!user && (
                    <>
                     <li className="navigation__mobile__item">
                         <Link 
                         to="/register" 
                         className={current === "register" 
                         ? activeClass 
                         : notActiveClass} 
                         onClick={() =>{handleNavVisible(); setCurrent("register");}}
                         >
                         <UserAddOutlined /> Register
                        </Link>
                    </li>
                     <li className="navigation__mobile__item">
                        <Link 
                         to="/login" 
                         className={current === "login" 
                        ? activeClass 
                        : notActiveClass} 
                        onClick={() =>{handleNavVisible(); setCurrent("login");}}
                        >
                         <UserOutlined /> Login
                        </Link>
                    </li>
                    </>)}
                    {user && user.role === "subscriber" && (
                    <li className="navigation__mobile__item">
                        <Link 
                        to="/user/history" 
                        className={current === "user" 
                        ? activeClass 
                        : notActiveClass} 
                        onClick={() =>{handleNavVisible(); setCurrent("user");}}
                        >
                         <UserOutlined /> {user.email && user.email.split("@")[0]}
                        </Link>
                    </li>
                    )}
                    {user && user.role === "admin" && (
                    <li className="navigation__mobile__item">
                        <Link 
                        to="/admin/dashboard" 
                        className={current === "admin" 
                        ? activeClass 
                        : notActiveClass} 
                        onClick={() =>{handleNavVisible(); setCurrent("admin");}}
                        >
                         <UserOutlined /> {user.email && user.email.split("@")[0]}
                        </Link>
                    </li>    
                    )}
                    </ul>
            </nav>
        </div>
    )
}

export default MenuMobile