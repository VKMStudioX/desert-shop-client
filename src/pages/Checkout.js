import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";
import HeadingFull from "../components/HeadingFull";
import { Button } from "antd"

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const applyDiscountCoupon = () => {
    // console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      // console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
        {p.product.title} - {p.product.title}  ={" "}
          ${p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="input-holder input-3"
      />
              <Button
                onClick={applyDiscountCoupon}
                type="default"
                className="u-margin-bottom-small u-margin-bottom-top bg-primary"
                block
                shape="square"
                size="large"
              >
                Apply
              </Button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      // console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <>
    <HeadingFull headingMarginTop={true}>Checkout</HeadingFull>
  
    
        <div className="center-cards">

       
        <div className="grid__flex grid__flex--col grid__flex--white">
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="grid__flex grid__flex--col grid__flex--white">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: ${total.toFixed(2)}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

<div className="grid__flex grid__flex--col grid__flex--white">
              <Button
                disabled={!products.length}
                onClick={createCashOrder}
                type="default"
                className="u-margin-bottom-small u-margin-bottom-top bg-primary"
                block
                shape="square"
                size="large"
              >
                Place Order
              </Button>
          </div>

          <div className="grid__flex grid__flex--col grid__flex--white">
              <Button
                disabled={!products.length}
                onClick={emptyCart}
                type="default"
                className="u-margin-bottom-small u-margin-bottom-top bg-primary"
                block
                shape="square"
                size="large"
              >
                Empty Cart
              </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
