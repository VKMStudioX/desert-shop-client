import React from 'react'

const HeadingFull = ({ children, headingMarginTop}) => {
    return (
        <div className={`full-columns full-columns__heading heading-unziale  ${headingMarginTop === true ? "u-margin-top-big" : null} `}>
    {children}</div>
    )
}

export default HeadingFull
