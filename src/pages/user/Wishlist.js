import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <>
    <div className="full-columns full-columns__heading heading-unziale u-margin-top-big">
    Wishlist</div>
    
        <div className="center-cards grid__shop">
          <UserNav />

        <div className="grid__flex grid__flex--col grid__flex--white">
        
          {wishlist.map((p) => (
            <div key={p._id} className="grid__flex grid__flex--row">
              <Link to={`/product/${p.slug}`}>{`${p.artist} - ${p.title}`}</Link>
              <div className=" grid__flex grid__flex--justify-end">
                <DeleteOutlined onClick={() => handleRemove(p._id)} className="text-danger" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
