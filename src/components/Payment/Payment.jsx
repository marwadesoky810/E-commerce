import React, { useContext, useState } from 'react';
import Style from './Payment.module.scss';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { CartContext } from '../../Context/cartContext';
import { RotatingLines } from "react-loader-spinner";
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Payment() {
  let { onlinePayment, cartId, setCartNumber, setCartDetails, setTotalCartPrice } = useContext(CartContext);
  let [isLoading, setIsLoading] = useState(false);

  async function paymentSubmit(values) {
    setIsLoading(true);
    let response = await onlinePayment(cartId, 'http://localhost:3000', values);
    setIsLoading(false);
    // console.log(response);
    window.location.href = response?.data.session.url;
    if (response?.data.status === 'success') {
      toast.success('Order Successfully Initialized');
      setCartDetails(null);
      setCartNumber(0);
      setTotalCartPrice(0);
    }
    else {
      toast.error('Error on creating order')
    }
  }
  let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;

  let validateSchema = Yup.object({
    details: Yup.string().required('Details is required'),
    phone: Yup.string().matches(phoneRegex, "Invalid Phone number").required("Phone number is required"),
    city: Yup.string().required('City is required'),
  }
  )
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: validateSchema,
    onSubmit: paymentSubmit,
  });
  return (<>
    <div className='w-75 mx-auto py-5 mt-5'>
      <form onSubmit={formik.handleSubmit} >
        <label htmlFor="details">Details:</label>
        <input
          type="text"
          name="details"
          id="details"
          className="form-control mb-2"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.details && formik.touched.details ? (
          <div className="alert alert-danger mt-2 p-2">
            {formik.errors.details}
          </div>
        ) : null}

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="form-control mb-2"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="alert alert-danger mt-2 p-2">
            {formik.errors.phone}
          </div>
        ) : null}

        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          id="city"
          className="form-control mb-2"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.city && formik.touched.city ? (
          <div className="alert alert-danger mt-2 p-2">
            {formik.errors.city}
          </div>
        ) : null}

        {isLoading ? (
          <button type="button" className="btn bg-main text-white mt-2">
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white mt-2"
          >
            Pay Now
          </button>
        )}
      </form>
    </div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Payment</title>
      <meta name="description" content="PaymentData" />
    </Helmet>
  </>

  )
}
