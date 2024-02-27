import React, { useContext } from 'react';
import Style from './ProductDetails.module.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { BallTriangle } from "react-loader-spinner";
import { WishListContext } from '../../Context/wishListContext';


export default function ProductDetails() {
  let { addToCart, setCartNumber } = useContext(CartContext);
  async function addProductToCart(id) {
    let { data } = await addToCart(id);
    setCartNumber(data.numOfCartItems);
    if (data.status === 'success') {
      toast.success('Product Added Successfully to your Cart', {
        duration: 4000,
        position: 'top-center',
        className: 'font-sm'
      })
    }
    else {
      toast.error('Error Adding Product')
    }
  }

  let { addToWishList } = useContext(WishListContext);
  async function addProductToWishList(id) {
    let { data } = await addToWishList(id);
    // console.log(data);
    if (data.status === 'success') {
      toast.success('Product Added Successfully to your Wish List', {
        duration: 4000,
        position: 'top-center',
        className: 'font-sm'
      })
      document.querySelector('.icon').classList.toggle('text-danger');
    }
    else {
      toast.error('Error Adding Product')
    }
  }

  var settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let params = useParams();
  // console.log(params);
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data, isLoading, isError, isFetching } = useQuery('productDetails', () => getProductDetails(params.id));
  // console.log(data);
  return (<>
    {data?.data.data ? <div className='row py-5 mt-5 align-items-center'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.data.data.title}</title>
        <meta name="description" content="Product Details" />
      </Helmet>
      <div className="col-md-4">
        <Slider {...settings}>
          {data?.data.data.images.map((img) => <img key={data?.data.data._id} className='w-100' src={img} alt={data?.data.data.title} />)}
        </Slider>
      </div>
      <div className="col-md-8">
        <h2 className='h5 fw-bold'>{data?.data.data.title}</h2>
        <p>{data?.data.data.description}</p>
        <h6>{data?.data.data.category.name}</h6>
        <h6 >{data?.data.data.price} <span className='text-main'>EGP</span></h6>
        <div className='d-flex justify-content-between'>
          <span>{data?.data.data.ratingsAverage}
          <i className='fa-solid fa-star rating-color me-1 ms-2'></i>
            <i className='fa-solid fa-star rating-color me-1'></i>
            <i className='fa-solid fa-star rating-color me-1'></i>
            <i className='fa-solid fa-star rating-color me-1'></i>
            <i className='fa-regular fa-star-half-stroke rating-color '></i>
          </span>
        </div>
        <div className='d-flex align-items-center justify-content-between'>
          <button onClick={() => addProductToCart(params.id)} className='btn w-100 bg-main mt-2 text-white'>Add to cart</button>
          <div onClick={()=> addProductToWishList(params.id)} className="icon fs-3 text-center mt-1 ms-2 cursor-pointer"><i className="fa-solid fa-heart"></i></div>
        </div>

      </div>
    </div> : <section className="d-flex vh-100 justify-content-center align-items-center mt-5 pt-5">
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
    </section>}
  </>
  )
}
