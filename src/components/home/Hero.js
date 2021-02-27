import React from 'react'
import { Link } from "react-router-dom"
import sekcjaStoneruLogo from "../../images/sekcjastoneru_logo.png"

const Hero = () => {
    return (
        <div className="hero">
        <div className="hero__text-box">
            <h1 className="heading-primary">
                <span className="heading-primary--main">Stoner</span>
                <span className="heading-primary--sub">when the music permeates you</span>
            </h1>
        </div>
        <div className="hero__logo-ss-box">
            <Link to={{ pathname: "http://sekcjastoneru.pl" }} target="_blank" >
                <img src={sekcjaStoneruLogo} alt="sekcjaStoneru" className="hero__logo-ss-box--image" />
            </Link>
        </div>
        </div>
    )
}

export default Hero
