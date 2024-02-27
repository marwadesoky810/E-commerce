import React, { useContext, useState } from "react";
import Style from "./Login.module.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { UserContext } from "../../Context/userContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  let [error, setError] = useState(null);
  let [isLoading, setisLoading] = useState(false);
  async function loginSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    // console.log(data);
    if (data.message === "success") {
      setisLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;

  let validateSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must contains capital letter, small letter, numbers and special characters, minimum length 8"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: loginSubmit,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5 mt-5 vh-100">
        {error !== null ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          ""
        )}
        <h2 className="fw-bolder mb-3">Login Now </h2>
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

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mb-2"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="enter ur password"

          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.password}
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
            <div className="d-flex flex-column">
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white mt-2"
              >
                Login
              </button>
              <div className='text-start m-1'>
             <Link to="/forgetPassword">Forget Password?</Link>
              </div>
              <p className='text-muted '>I don't have account!
           <Link to="/register" className='text-success fw-bold text-decoration-none ms-2'>
            Register Now</Link> 
            </p>
              
            </div>
          )}
        </form>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <meta name="description" content="LoginData" />
      </Helmet>
    </>
  );
}
