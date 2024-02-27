import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Helmet } from "react-helmet";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  let navigate = useNavigate();
  let [error, setError] = useState(null);
  let [isLoading, setisLoading] = useState(false);

  async function resetPasswordSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    // console.log(data);
    if (data.token !== null) {
      toast.success("the processing was done", {
        duration: 4000,
        position: "top-center",
        className: "font-sm",
      });
      navigate("/login");
    }
  }

  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;

  let validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .matches(
        passwordRegex,
        "Password must contains capital letter, small letter, numbers and special characters, minimum length 8"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPasswordSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5 mt-5 vh-100">
        {error !== null ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          ""
        )}
        <h2 className="fw-bolder mb-3">Reset Password :</h2>
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
            placeholder="enter your e-mail"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.email}
            </div>
          ) : null}

          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="form-control mb-2"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="enter new password"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.newPassword}
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
              Reset Password
            </button>
          )}
        </form>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
        <meta name="description" content="Reset Password" />
      </Helmet>
    </>
  );
}
