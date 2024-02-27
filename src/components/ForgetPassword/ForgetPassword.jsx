import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Helmet } from "react-helmet";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let navigate = useNavigate();
  let [error, setError] = useState(null);
  let [isLoading, setisLoading] = useState(false);

  async function forgetPasswordSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });

    if (data.statusMsg === "success") {
      setisLoading(false);
      setError(null);
      document.querySelector(".forgetPassword").classList.add("d-none");
      document.querySelector(".sendCode").classList.remove("d-none");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPasswordSubmit,
  });

  async function sendCodeSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    // console.log(data);
    if (data.status === "Success") {
      // console.log('hi');
      setisLoading(false);
      setError(null);
      navigate("/resetPassword");
    }
  }

  let validationSchemaCode = Yup.object({
    resetCode: Yup.number("Enter a valid code").required("Code is Required"),
  });

  let formikCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchemaCode,
    onSubmit: sendCodeSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5 mt-5 vh-100 forgetPassword">
        {error !== null ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          ""
        )}
        <h2 className="fw-bolder mb-3">Forget Password :</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control mb-2"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="enter ur e-mail"

          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.email}
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
              Send Code
            </button>
          )}
        </form>
      </div>

      <div className="w-75 mx-auto py-5 mt-5 vh-100 sendCode d-none">
        {error !== null ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          ""
        )}
        <h2 className="fw-bolder mb-3">Verify Code :</h2>
        <form onSubmit={formikCode.handleSubmit}>
          <label htmlFor="resetCode">Reset Code:</label>
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            className="form-control mb-2"
            value={formikCode.values.resetCode}
            onChange={formikCode.handleChange}
            onBlur={formikCode.handleBlur}
            placeholder="enter reset code"
          />
          {formikCode.errors.resetCode && formikCode.touched.resetCode ? (
            <div className="alert alert-danger mt-2 p-2">
              {formikCode.errors.resetCode}
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
              disabled={!(formikCode.isValid && formikCode.dirty)}
              type="submit"
              className="btn bg-main text-white mt-2"
            >
              Verify Code
            </button>
          )}
        </form>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
        <meta name="description" content="userData" />
      </Helmet>
    </>
  );
}
