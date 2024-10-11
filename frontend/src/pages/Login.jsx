import React, { useState } from "react";
import { useFormik } from "formik";
import registerimage from "../assets/register.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Ligin() {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  async function handleLogin(values) {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      username: "joss",
      password: "exaassssword123"
    });
    console.log(response);
    console.log(values);
    if (response.status === 200) {
      console.log(response.data.token);
      localStorage.setItem("userToken", response.data.token);
      navigate("/");
    }
  }

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is Required";
    } else if (values.username.length > 10) {
      errors.username = "username Must be 20 characters or less";
    }

    if (!values.password) {
      errors.password = "password is Required";
    } else if (values.password.length > 15) {
      errors.password = "password Must be 15 characters or less";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: handleLogin,
  });
  return (
    <div className="d-flex w-100 flex-column flex-md-row" style={{ display: "flex", height: "100vh" }}>
      <div className="w-md-50 w-100 p-2 p-md-5 m-md-5 mt-5 mx-auto py-4">
        <form onSubmit={formik.handleSubmit}>
          <h1>
            Welcome
            <div className="h2 mb-4" style={{ color: "#c07b0d" }}>
              Discover timeless beauty and sign in to explore our finest pieces{" "}
            </div>
          </h1>
          <label htmlFor="username">username</label>
          <input
            className="form-control mb-1 mt-2 border-secondary"
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && formik.touched.username ? (
            <div className="alert alert-danger p-1 text-danger">
              {formik.errors.username}
            </div>
          ) : null}
          <label htmlFor="password">password</label>
          <input
            className="form-control mb-1 mt-2 border-secondary"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-1 text-danger">
              {formik.errors.password}
            </div>
          ) : null}

          {
            <div className="text-center mt-4 ">
              {isloading ? (
                <button
                  type="button"
                  className="btn w-25 text-white"
                  style={{ backgroundColor: "rgb(151 80 44)" }}
                >
                  <i class="fa-solid fa-spinner"></i>
                </button>
              ) : (
                <button
                  className="btn w-25 text-white"
                  type="submit"
                  style={{ backgroundColor: "rgb(151 80 44)" }}
                >
                  Submit
                </button>
              )}
            </div>
          }
        </form>
      </div>

      <div className="col-12 col-md-6">
        <img src={registerimage} width="100%" height="100%" alt="login image" />
      </div>
    </div>
  );
}

export default Ligin;
