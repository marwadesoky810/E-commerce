import React from 'react';
import Style from './CategorySlider.module.scss';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { data } = useQuery('categorySlider', getCategories);

  return (

    <div className='pt-5'>
      <Slider {...settings}>
        {data?.data.data.map((category) => <img style={{ objectFit: 'cover' }} height={200} key={category._id} src={category.image} className='w-100' alt='categoryImg' />)}
      </Slider>
    </div>

  )
}
