import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/wishListContext";

export default function Products() {

  let { addToCart, setCartNumber } = useContext(CartContext);

  
  async function addProductToCart(id) {
    let { data } = await addToCart(id);
    setCartNumber(data.numOfCartItems);
    if (data.status === 'success') {
      toast.success('Product Added Successfully to your Cart 👌', {
        duration: 4000,
        position: 'top-center'
      })
    }
    else {
      toast.error('Error Adding Product')
    }
  }

  let { addToWishList } = useContext(WishListContext);
  async function addProductToWishList(id) {
    let { data } = await addToWishList(id);
    if (data.status === 'success') {
      toast.success('Product Added Successfully to your Wishlist❤️', {
        duration: 4000,
        position: 'top-center'
      })
      document.querySelector('.icon').classList.toggle('text-danger');
    }
    else {
      toast.error('Error Adding Product')
    }
  }

  let { data, isLoading } = useQuery('featuredProducts', getFeaturedProducts,
    {
      cacheTime: 3000,
      refetchInterval: 5000,
    }
  );

  function getFeaturedProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  return (<>
    {isLoading ? <div className="w-100 py-5 d-flex justify-content-center mt-5 vh-100 align-items-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div> : <div className="container py-5">
     
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <meta name="description" content="Products" />
      </Helmet>
      <div className="row mt-5 gy-4">
        {data?.data.data.map((product) =>
          <div key={product.id} className="col-md-3">
            <div className="product p-3 cursor-pointer category-hover">
              <Link to={`/productDetails/${product.id}`}>
                <img className="w-100" src={product.imageCover} alt={product.title} />
                <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                <h3 className="h6">{product.title}</h3>
                <div className="d-flex justify-content-between mt-3">
                  <span>{product.price} <span className="text-main">EGP</span> </span>
                  <span><i className="fas fa-star rating-color"></i>{product.ratingsAverage}</span>
                </div>
              </Link>
              <div className="d-flex justify-content-between">
                <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white w-75 btn-sm mt-2">+Add to Cart</button>
                <div onClick={() => addProductToWishList(product.id)} className="icon fs-3 text-center mt-1"><i className="fa-solid fa-heart"></i></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>}
    
  </>
  )
}
