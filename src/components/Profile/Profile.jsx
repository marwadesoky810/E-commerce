import React, { useContext, useEffect, useState } from 'react';
import Style from './Profile.module.scss';
import { Helmet } from 'react-helmet';
import jwtDecode from 'jwt-decode';
import { BallTriangle } from "react-loader-spinner";
import { UserContext } from '../../Context/userContext';


export default function Profile() {
  let { name, setName } = useContext(UserContext);

  useEffect(() => {
    let { name } = jwtDecode(localStorage.getItem('userToken'));
    setName(name);
  }, []);


  if (name === null) {
    return (
      <div className='vh-100 d-flex justify-content-center align-items-center mt-5 pt-5'>
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
      </div>
    )
  }
  return (
    <div className='mt-5 pt-5'>
      <div>
        <h1 className='text-center fw-bold'>Hello <span className='text-capitalize'>{name}</span></h1>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
        <meta name="description" content="user profile" />
      </Helmet>
    </div>
  )
}
