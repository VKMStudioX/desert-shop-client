import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import HeadingFull from "../../../components/HeadingFull";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      // console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.error(err);
        });
    }
  };

  return (
    <>
<HeadingFull headingMarginTop={true}>All products</HeadingFull>
       
    
        <div className="center-cards grid__shop">
              <AdminNav />
          
    
              <section className="cards" >
       {loading ? (
          <Loader/>
        ) : (
          <> 
            {products.map((product) => (
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                  key={product._id}
                />
            ))}
         </>
        )}
      </section>
</div>
</>
  );
};

export default AllProducts;
