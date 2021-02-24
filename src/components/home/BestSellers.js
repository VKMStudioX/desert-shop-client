import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import Loader from "../Loader"
import { Pagination } from "antd"
import HeadingFull from "../HeadingFull"

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <HeadingFull>
        <div className="grid__flex grid__flex--align-center grid__flex--justify-space-between">
        Bestsellers

        <nav>
          <Pagination
            current={page}
            total={(productsCount / 4) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
        </div>
        </HeadingFull>

<section className="cards center-cards">
       {loading ? (
          <Loader/>
        ) : (
          <> 
            {products.map((product) => (
                <ProductCard product={product}  key={product._id}/>
            ))}
         </>
        )}
      </section>
      
    </>
  );
};

export default BestSellers;