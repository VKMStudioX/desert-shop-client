import React, { useEffect, useState } from 'react'
import { fetchProductsByFilter } from "../../functions/product";
import { Link } from "react-router-dom";

const TopAlbums = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts({ category: process.env.REACT_APP_TOP_ALBUMS_CATEGORY_ID });
      }, []);
    
      const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
          setProducts(res.data);
          // console.log(res.data)
        });
      };
      const topAlbumsItems = products.map((album) => {
          return (        
        <figure key={album.slug} className={`topAlbums__item topAlbums__item--${album.subs[0].name.slice(1)}`}>
            <Link to={`/product/${album.slug}`}>
                <img 
                src={album.images[0].url} 
                alt={`topAlbums image ${album.subs[0].name.slice(1)}`} 
                className="topAlbums__img" 
                />
                <div className="topAlbums__img--text">
                  {album.subs[0].name}
                </div>
            </Link>
        </figure>   
      )})

    return (
        <>
             <div className="full-columns full-columns__heading heading-unziale">
        Top Albums of 2020 </div>
       
       <section className="topAlbums">
            {topAlbumsItems}
       </section>
        </>
    )
}

export default TopAlbums
