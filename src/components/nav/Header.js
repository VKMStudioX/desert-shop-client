import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import MenuNav from "./MenuNormal";
import MenuMobile from "./MenuMobile";
import Search from "../forms/Search";
import sunset from "../../images/sunset_logo.png"
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };
  
  let { user } = useSelector((state) => ({ ...state }));
  

  let history = useHistory();

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, [history, scrollPosition]);


  return (
 <>
<nav className="navigation">
    <div 
    className={scrollPosition < 500 && history.location.pathname === "/" 
    ? "navigation__logo navigation__logo--normal" 
    : "navigation__logo navigation__logo--small"}  
    >
    <Link to="/">
      <img 
       src={sunset} alt="logo"
       className={scrollPosition < 500 && history.location.pathname === "/" 
       ? "navigation__logo--image-normal" 
       : "navigation__logo--image-small"}  
      />
      </Link></div>
    <div className="navigation__search"><Search /></div>

<div className="navigation__menu--normal">
     <MenuNav user={user} />
    </div>

    <div className="navigation__menu--mobile">
    <MenuMobile user={user} />
    </div>

    </nav>
</>

  );
};

export default Header;
