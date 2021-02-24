import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import { Button } from "antd";
import HeadingFull from "../components/HeadingFull";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      const totalValue = Number(currentValue + nextValue.count * nextValue.price);
       return totalValue;
    }, 0);
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        // console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.error("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Artist</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <>
    <HeadingFull headingMarginTop={true}>Cart</HeadingFull>
  
        <div className="center-cards grid__shop">
          
        <div className="grid__flex grid__flex--col grid__flex--white">
      
          <h4>Order Summary</h4>
          <hr />
          <p><strong>Products:</strong></p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
               {c.artist} - {c.title} 
               <br/>
               ${c.price * c.count}
              </p>
              
            </div>
          ))}
          <hr />
          Total: <b>${getTotal().toFixed(2)}</b>
          <hr />
          {user ? (
            <>
              <Button
                onClick={saveCashOrderToDb}
                disabled={!cart.length}
                type="default"
                className="u-margin-bottom-small bg-primary"
                block
                shape="square"
                size="large"
              >
                Proceed to Order
              </Button>
            </>
          ) : (
            <Button
                disabled={!cart.length}
                type="default"
                className="u-margin-bottom-small bg-primary"
                block
                shape="square"
                size="large"
              >
               <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
              </Button>
          )}
        </div>

        <div className="grid__flex grid__flex--col grid__flex--white">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>

      </div>
    </>
  );
};

export default Cart;
