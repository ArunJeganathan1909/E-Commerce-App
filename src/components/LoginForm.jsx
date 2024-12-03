import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../layout/components/LoginForm.css";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice"; 

const LoginForm = ({ onSubmit, closeAuthModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user); 

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(signInStart());
    try {
      if (
        values.email === "admin@gmail.com" &&
        values.password === "Admin1234"
      ) {
        dispatch(signInSuccess({ email: values.email }));
        alert("Successfully Logged In!"); 
        closeAuthModal();
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className="login-form">
          <div className="login-content">
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="input-field"
            />
            <label
              htmlFor="email"
              className={values.email ? "label-active" : ""}
            >
              Email
            </label>
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="login-content">
            <Field
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Your Password"
              className="input-field"
            />
            <label
              htmlFor="password"
              className={values.password ? "label-active" : ""}
            >
              Password
            </label>
            <IconButton
              onClick={togglePasswordVisibility}
              edge="end"
              aria-label="toggle password visibility"
              className="eye-icon"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting || loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="error">{error}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
