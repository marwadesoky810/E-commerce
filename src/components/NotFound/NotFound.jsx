import React from 'react';
import imgError from '../../Assets/Images/error.svg'
export default function NotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <img src={imgError}  alt="notFound" className='w-75' />
    </div>
  )
}
