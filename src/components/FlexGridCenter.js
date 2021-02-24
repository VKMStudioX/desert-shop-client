import React from 'react'

const FlexGridCenter = ({flexOnly, direction, color, children}) => {

    const classNamePar1 = direction === "col" ? "grid__flex--col" : "grid__flex--row"
    const classNamePar2= color === "dark" ? "grid__flex--dark" : "grid__flex--white"
    const classNamePar3= flexOnly === "true" ? "grid__flex" : "cards center-cards grid__flex"
    
    return (
    <div className={`${classNamePar1} ${classNamePar2} ${classNamePar3}`}    >
    {children}
    </div>
    )
}

export default FlexGridCenter
