import React from 'react'
import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <div className="hero">
        <div className="hero__text-box">
            <h1 className="heading-primary">
                <span className="heading-primary--main">Stoner</span>
                <span className="heading-primary--sub">when the music permeates you</span>
            </h1>

            <Link to='/shop' className="btn btn--dark">Discover our albums</Link>
            </div>
        </div>
    )
}

export default Hero
