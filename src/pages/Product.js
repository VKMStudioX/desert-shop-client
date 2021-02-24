import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import { getUserOrders } from "../functions/user";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import HeadingFull from "../components/HeadingFull";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const [orders, setOrders] = useState([]);
  const [productId, setProductId] = useState();
  const [isAlbumBought, setIsAlbumBought] = useState();

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
    if (product) {setProductId(product._id)}
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
      
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      // console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  useEffect(() => {
    loadUserOrders();
  }, [user,slug]);

  const loadUserOrders = () => {
  if (user) {  
  getUserOrders(user.token).then((res) => {
      // console.log(`userOrders in Product.js ${JSON.stringify(res.data, null, 4)}`);
      setOrders(res.data);
      albumBoughtByUserCheck();
  })
}
}

useEffect(() => {
  // setIsAlbumBought(false);
  albumBoughtByUserCheck();
}, [orders]);

const albumBoughtByUserCheck = () => {
  if (orders) {
    let albumBoughtCheckArr = []

    orders.forEach(
      order => order.products.forEach(
          product => albumBoughtCheckArr.push(product.product._id, ...albumBoughtCheckArr)
          ))
        
    const albumBoughtCheck = albumBoughtCheckArr.includes(productId)
    // console.log(`incl ${albumBoughtCheck}`)
    
    albumBoughtCheck ? setIsAlbumBought(true) : setIsAlbumBought(false)
  }
}

  return (
  <>  

<HeadingFull headingMarginTop={true}>{product.artist} - {product.title}</HeadingFull>

        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
          isAlbumBought={isAlbumBought}
        />

<HeadingFull headingMarginTop={false}>Related Products</HeadingFull>

<section className="cards center-cards" >
{related.length ? (
  related.map((r) => (
      <ProductCard product={r} key={r._id}/>
  ))
) : (
  <div className="center-cards grid-flex grid-flex--white">No Products Found</div>
)}
</section>
</>
  );
};

export default Product;
