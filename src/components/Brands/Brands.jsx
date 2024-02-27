import React from 'react';
import Style from './Brands.module.scss';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from "react-loader-spinner";
import { Link } from 'react-router-dom';

export default function Brands() {

  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data } = useQuery('allBrands', getAllBrands);
  // console.log(data);

  return (
    <div className='mt-5 pt-5 mb-5'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <meta name="description" content="Brands" />
      </Helmet>
      {data?.data.data ? (<>
        <div className='row align-items-center gy-5 mt-2'>
          {data?.data.data.map((brand) => <div key={brand._id} className='col-md-3'>
            <div>
              <div className='rounded border rounded-2 box-shadow cursor-pointer p-3 text-center h5 fw-bold category-hover'>
                <div>
                  <img src={brand?.image} alt="brandImg" />
                  <p className='fw-light'>{brand.name}</p>
                </div>
              </div>
            </div>
          </div>)}
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
