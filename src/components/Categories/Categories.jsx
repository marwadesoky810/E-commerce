import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import { BallTriangle } from "react-loader-spinner";
import { Link } from 'react-router-dom';

export default function Categories() {
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  function subcategory(id){
    document.querySelector('.sub').classList.replace('d-none','d-flex');
  }

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { data, isLoading, isError, isFetching } = useQuery('categorySlider', getCategories);
  // console.log(data);

  function getSubCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
  }
  let response = useQuery('subCategories', getSubCategories);
  // console.log(response);

  return (
    <div className='mt-5 pt-5 mb-5'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
        <meta name="description" content="Categories of Products" />
      </Helmet>
      {data?.data.data && response?.data?.data.data ? (<>
        <div className='py-4'>
          <Slider {...settings}>
            {data?.data.data.map((category) => <img style={{ objectFit: 'cover' }} height={200} key={category._id} src={category.image} className='w-100' alt='categoryImg' />)}
          </Slider>
        </div>
        <div className='row align-items-center gy-5 mt-2'>
          {data?.data.data.map((categoryProducts) => <div key={categoryProducts._id} className='col-md-4'>
            <div onClick={()=>{subcategory(categoryProducts._id)}}>
              <div className='rounded rounded-3 border overflow-auto box-shadow cursor-pointer pb-2 category-hover'>
                <figure>
                  <img src={categoryProducts.image} alt="categoryProductsImg" className='w-100 border' style={{ height: '20rem' }} />
                </figure>
                <div className='text-center text-main '>
                  <h5 className='h3 fw-bold'>{categoryProducts.name}</h5>
                </div>
              </div>
            </div>
          </div>)}
        </div>
        <div className='row align-items-center gy-3 mt-4 d-none sub'>
          {response?.data?.data.data.map((subCategories) => <div key={subCategories._id} className='col-md-4'>
                <Link to={`/specificSubCategory/${subCategories._id}`}>
                  <div className='rounded border rounded-2 box-shadow cursor-pointer p-3 text-center h5 fw-bold category-hover'>
                    {subCategories.name}
                  </div>
                </Link>
              </div>
            )}
        </div>
      </>) : (<>
        <section className="d-flex vh-100 justify-content-center align-items-center mt-5 pt-5">
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
        </section>
      </>)}
    </div>
  )
}
