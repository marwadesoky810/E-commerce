import React from 'react';
import Products from './../Products/Products';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import CategorySlider from '../CategorySlider/CategorySlider';

export default function Home() {
  return (
    <div>
      <MainSlider />
      <CategorySlider />
      <Products />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
        <meta name="description" content="Fresh Cart" />
      </Helmet>
    </div>
  )
}
