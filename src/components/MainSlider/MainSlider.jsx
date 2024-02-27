import React from 'react';
import Slider from "react-slick";
import img1 from '../../Assets/Images/slider-image-1.jpeg';
import img2 from '../../Assets/Images/slider-image-2.jpeg';
import img3 from '../../Assets/Images/slider-image-3.jpeg';
import img5 from '../../Assets/Images/grocery-banner-2.jpeg';

export default function MainSlider() {
  var settings = {
    dots: true,
    autoplay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  return (
    <div className="row gx-0 mt-5 pt-5">
      <div className="col-md-9">
        <Slider {...settings}>
          <img src={img1} alt="MainSliderImg1" className='w-100' height={400} />
          <img src={img2} alt="MainSliderImg2" className='w-100' height={400} />
          <img src={img5} alt="MainSliderImg3" className='w-100' height={400} />
        </Slider>
      </div>
      <div className="col-md-3">
        <img src={img3} alt="MainSliderImg4" className='w-100' height={200} />
        <img src={img2} alt="MainSliderImg5" className='w-100' height={200} />
      </div>
    </div>
  )
}
