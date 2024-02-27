import React, { useState } from "react";
import Style from "./Register.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";

export default function Register() {
  let navigate = useNavigate();
  let [error, setError] = useState(null);
  let [isLoading, setisLoading] = useState(false);
  async function submitRegister(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    if (data.message === "success") {
      toast.success("your registration was done", {
        duration: 4000,
        position: "top-center",
        className: "font-sm",
      });
      setisLoading(false);
      navigate("/login");
    }
  }

  // function validate(values) {
  //   let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;
  //   let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
  //   let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  //   let nameRegex = /^[A-Z][a-z A-z 0-9]{3,20}$/;

  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "Name is required";
  //   } else if (!nameRegex.test(values.name)) {
  //     errors.name =
  //       "Please enter any character from a to z or A to Z and containing any number from 0 to 9 with minlength 3 and maxlength 20";
  //   }
  //   if (!values.phone) {
  //     errors.phone = "Phone number is required";
  //   } else if (!phoneRegex.test(values.phone)) {
  //     errors.phone = "Phone number invalid";
  //   }
  //   if (!values.email) {
  //     errors.email = "Email address field cannot be empty";
  //   } else if (!emailRegex.test(values.email)) {
  //     errors.email = "Invalid email address ex:name@example.com";
  //   }
  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (!passwordRegex.test(values.password)) {
  //     errors.password =
  //       "Password must contains capital letter, small letter, numbers and special characters, minimum length 8";
  //   }
  //   if(!values.rePassword)
  //   {
  //     errors.rePassword='rePassword is required and must be matched';
  //   }
  //   else if(values.password !==values.rePassword)
  //   {
  //     errors.rePassword='password is not matched';
  //   }
  //   return errors;
  // }

  let nameRegex = /^[A-Z][a-z A-z 0-9]{3,20}$/;
  let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;

  let validateSchema = Yup.object({
    name: Yup.string()
      .matches(
        nameRegex,
        "Please enter any character from a to z or A to Z start with capital letter and containing any number from 0 to 9 with minlength 3 and maxlength 20"
      )
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegex, "Invalid Phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must contains capital letter, small letter, numbers and special characters, minimum length 8"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and rePassword are not matched")
      .required("rePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: submitRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5 mt-5 ">
        {error !== null ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          ""
        )}
        <h2 className="fw-bolder mb-3">Register Now </h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control mb-2"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="enter your name"

          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.name}
            </div>
          ) : null}

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
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control mb-2"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="enter your phone number"

          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mb-2"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="enter your password"

          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.password}
            </div>
          ) : null}

          <label htmlFor="rePassword">Re-Password:</label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control mb-2"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="confirm password"

          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.rePassword}
            </div>
          ) : null}

          
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.phone}
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
              Register
            </button>
          )}
        </form>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <meta name="description" content="RegisterData" />
      </Helmet>
    </>
  );
}
