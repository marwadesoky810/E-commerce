import React from 'react';
import Style from './SpecificSubCategory.module.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { BallTriangle } from "react-loader-spinner";

export default function SpecificSubCategory() {
  let params = useParams();

  function getSubCategoryDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
  }
  let { data } = useQuery('subCategoryDetails', () => getSubCategoryDetails(params.id));
  // console.log(data);

  return (<>
    {data?.data.data ? (<>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.data.data.name}</title>
        <meta name="description" content="Product Details" />
      </Helmet>
      <div className='row justify-content-center py-5 mt-5'>
        <h3 className='mb-4 fw-bold'>SubCategory Details</h3>
        <div className="col-md-6">
          <div className='text-center text-main rounded rounded-3 border box-shadow cursor-pointer category-hover'>
            <h5 className='h3 fw-bold p-2'>{data?.data.data.name}</h5>
          </div>
        </div>
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
  </>
  )
}
