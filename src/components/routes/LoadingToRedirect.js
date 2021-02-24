import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HeadingFull from "../HeadingFull";
import FlexGridCenter from "../FlexGridCenter";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <>
    <HeadingFull headingMarginTop={true}>Redirecting...</HeadingFull>

    <FlexGridCenter>
      <p>Redirecting you in {count} seconds</p>
    </FlexGridCenter>
    </>
  );
};

export default LoadingToRedirect;
