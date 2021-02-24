import React, { useState } from "react";
import { Card } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import vinyl from "../../images/vinyl.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  // destructure
  const { images, artist, title, release, description, slug, price } = product;
  return (
    <>
    <div className="card">
      <Link to={`/product/${slug}`} className="card__img">
       <img src={images && images.length ? images[0].url : vinyl} alt="product" className="card__img"></img>
      </Link>
      
      <h5 className="card__name">{artist} - {title}</h5>
      
      <div className="card__release">
       <p>Released: {release}</p>
      </div>
      
      <div className="card__price">
       <p>Price: ${price}</p>
      </div>
      
      <div className="card__price">
       <p>Rating: {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : "No rating yet"}</p>
      </div>
      
       <button className="btn btn--dark btn--card" onClick={handleAddToCart}><ShoppingCartOutlined /> {product.quantity < 1 ? "Out of stock" : "Add to Cart"}</button>
       <button className="btn btn--dark btn--card"><HeartOutlined /> Add to Wishlist</button>
    </div>
    </>
  );
};

export default ProductCard;
